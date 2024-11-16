import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatComponent from './ChatComponent';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaSignOutAlt } from 'react-icons/fa';

const socket = io('http://localhost:3000');

function VideoCallPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        const constraints = { video: true, audio: true };
        const newPeerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        setPeerConnection(newPeerConnection);

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                setMediaStream(stream);
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach(track => {
                    if (newPeerConnection.signalingState !== 'closed') {
                        newPeerConnection.addTrack(track, stream);
                    
                    } else {
                        console.error('Peer connection is closed. Cannot add track.');
                    }
                });
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });

        newPeerConnection.ontrack = (event) => {
            console.log('Remote track received:', event);
            if (event.streams && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
            } else {
                console.error('No remote stream found.');
            }
        };

        socket.on('offer', (offer) => {
            console.log('Received offer:', offer);
            newPeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
                .then(() => newPeerConnection.createAnswer())
                .then(answer => {
                    newPeerConnection.setLocalDescription(answer);
                    socket.emit('answer', answer);
                })
                .catch((error) => {
                    console.error('Error handling offer:', error);
                });
        });

        socket.on('answer', (answer) => {
            console.log('Received answer:', answer);
            newPeerConnection.setRemoteDescription(new RTCSessionDescription(answer))
                .catch((error) => {
                    console.error('Error setting remote description:', error);
                });
        });

        socket.on('ice-candidate', (candidate) => {
            console.log('Received ICE candidate:', candidate);
            newPeerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                .catch((error) => {
                    console.error('Error adding ICE candidate:', error);
                });
        });

        newPeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate);
            }
        };

        // Cleanup on component unmount
        return () => {
            if (newPeerConnection.signalingState !== 'closed') {
                newPeerConnection.close();
            }
            socket.disconnect();
        };
    }, [sessionId]);

    const handleDisconnect = () => {
        if (peerConnection) {
            // Close the peer connection
            peerConnection.close();
            setPeerConnection(null);
        }
    
        if (mediaStream) {
            // Stop all media tracks
            mediaStream.getTracks().forEach(track => {
                track.stop();
            });
        }
    
        // Disconnect the socket
        socket.disconnect();
    
        // Redirect to /patient
        navigate('/patient');
    };
    

    const handleMute = () => {
        if (mediaStream) {
            mediaStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            setIsMuted(!isMuted);
        }
    };

    const handleCameraToggle = () => {
        if (mediaStream) {
            mediaStream.getVideoTracks().forEach(track => {
                track.enabled = isCameraOff;
                if (!isCameraOff) {
                    track.stop();
                }
            });
            setIsCameraOff(!isCameraOff);

            if (isCameraOff) {
                // Restart video stream when turning camera back on
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((newStream) => {
                        const videoTrack = newStream.getVideoTracks()[0];
                        const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
                        sender.replaceTrack(videoTrack);
                        localVideoRef.current.srcObject = newStream;
                    })
                    .catch((error) => {
                        console.error('Error restarting video:', error);
                    });
            }
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h1 className="text-3xl font-bold text-white mb-6">Virtual Consultation</h1>
            <div className="flex justify-center gap-4 w-full max-w-4xl">
                <video ref={localVideoRef} autoPlay muted={isMuted} className="w-1/2 rounded-lg shadow-lg" />
                <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg shadow-lg" />
            </div>
            <ChatComponent className="mt-4 w-full max-w-4xl" />
            <div className="mt-6 flex gap-6">
                <button 
                    className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    onClick={handleMute}
                >
                    {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
                </button>
                <button 
                    className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    onClick={handleCameraToggle}
                >
                    {isCameraOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
                </button>
                <button 
                    className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    onClick={handleDisconnect}
                >
                    <FaSignOutAlt size={24} />
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 93px)', // Adjust for the navbar height
        backgroundColor: 'transparent', // Remove background
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    videoContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px', // Space between videos
    },
    video: {
        width: '45%',
        height: 'auto',
        border: '2px solid #ccc',
        borderRadius: '8px',
    },
    controls: {
        marginTop: '20px',
        display: 'flex',
        gap: '10px', // Space between buttons
    },
    button: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#000',
    },
};

export default VideoCallPage;
