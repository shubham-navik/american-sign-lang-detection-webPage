import pickle
import cv2
import mediapipe as mp
import numpy as np

# Load the pre-trained model
class NewClass:

    def newMethod():
        model_dict = pickle.load(open('model.p', 'rb'))
        model = model_dict['model']

        predicted_character=''
        # Initialize MediaPipe Hands module
        mp_hands = mp.solutions.hands

        hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

        # Define dictionary to map predicted labels to corresponding letters
        labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'L'}

        def process_image(image_path):
            # Read the input image
            frame = cv2.imread(image_path)

            # Check if frame is None
            if frame is None:
                print("Failed to read the image. Exiting...")
                return

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

                # Print predicted letter to the terminal
                print("Predicted character:", predicted_character)

        # Test the function with an image path
        image_path = '../uploads/uploaded_image.jpg'
        process_image(image_path)

        return predicted_character

