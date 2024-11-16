from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import final
from final import get_predicted_value, helper

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def index():
    return "Welcome to the Prediction API"


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = final.predict(data)
    return jsonify({'result': prediction})

if __name__ == "__main__":
    app.run(debug=True)