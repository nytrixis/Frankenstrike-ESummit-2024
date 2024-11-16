import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function ChatComponent() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('chat-message', message);
        setMessage('');
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.input}
            />
            <button onClick={sendMessage} style={styles.button}>Send</button>
        </div>
    );
}

const styles = {
    chatContainer: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '300px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
    },
    messages: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginBottom: '10px',
    },
    message: {
        padding: '5px',
        borderBottom: '1px solid #eee',
    },
    input: {
        width: '80%',
        padding: '5px',
        marginRight: '10px',
    },
    button: {
        padding: '5px 10px',
        cursor: 'pointer',
    }
};

export default ChatComponent;
