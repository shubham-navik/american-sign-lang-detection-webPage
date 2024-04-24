from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import mediapipe as mp
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained model
model_dict = pickle.load(open(r'C:\Users\shubham\OneDrive\Documents\Desktop\new-python-project\backend\models\model.p', 'rb'))
model = model_dict['model']

# Initialize MediaPipe Hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Define dictionary to map predicted labels to corresponding letters
labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'L'}

# Function to save the uploaded image to a file
def save_image(image_data):
    # Define the directory where images will be saved
    upload_dir = 'uploads'
    os.makedirs(upload_dir, exist_ok=True)  # Create the directory if it doesn't exist
    
    # Generate a unique filename for the uploaded image
    filename = 'uploaded_image.jpg'
    filepath = os.path.join(upload_dir, filename)
    
    # Save the image data to the file
    with open(filepath, 'wb') as f:
        f.write(image_data)
    
    return filepath

@app.route('/predict', methods=['POST'])
def upload_image():
    # Check if the POST request contains a file
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    # Get the file from the POST request
    image_file = request.files['image']
    
    # Save the image file to a separate file
    image_data = image_file.read()
    image_path = save_image(image_data)

    # Read the input image
    frame = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

    # Check if frame is None
    if frame is None:
        return jsonify({'error': 'Failed to read the image. Exiting...'}), 400

    data_aux = []
    x_ = []
    y_ = []

    # Get frame dimensions
    H, W, _ = frame.shape

    # Convert the frame to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process hand landmarks
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y

                x_.append(x)
                y_.append(y)

            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x - min(x_))
                data_aux.append(y - min(y_))

        # Predict gesture using the model
        prediction = model.predict([np.asarray(data_aux)])
        
        predicted_character = labels_dict[int(prediction[0])]

        # Return the predicted character
        return jsonify({'predicted_character': predicted_character}), 200
    else:
        return jsonify({'error': 'No hand detected in the image'}), 400

if __name__ == '__main__':
    app.run(debug=True)

