import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import PredictedResponse from './PredictedResponse';

const CameraCapture = ({ onImageCapture }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [predictionResponse, setPredictionResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = React.useRef(null);

  // Function to open the camera
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  // Function to capture image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onImageCapture(imageSrc); // Callback to parent component
  };

  // Function to close the camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  // Function to send prediction request to backend
  const predictResponse = () => {
    setIsLoading(true); // Set loading state to true

    // Create a Blob object from the base64 data
    const blob = dataURLtoBlob(capturedImage);

    // Create FormData object to send the image data to the backend
    const formData = new FormData();
    formData.append('image', blob);

    // Send captured image data to the backend for prediction
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        const predictionData = response.data.predicted_character;
        setPredictionResponse(predictionData);
        setIsLoading(false); // Set loading state to false after response
      })
      .catch(error => {
        
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  // Function to convert base64 data to a Blob object
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="flex">
      {/* Left div for live camera feed */}
      <div className="flex-1 mr-4 h-auto">
        <div className="  bg-slate-800 max-w-lg mx-auto my-4 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Live Camera Feed</h2>
          {isCameraOpen && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full"
            />
          )}
          <div className="flex justify-center mt-4">
            {!isCameraOpen && (
              <button onClick={openCamera} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Open Camera
              </button>
            )}
            {isCameraOpen && (
              <>
                <button onClick={captureImage} className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                  Capture Image
                </button>
                <button onClick={closeCamera} className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                  Close Camera
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right div for displaying captured image and prediction response */}
      <div className="flex-1 ml-4 h-auto">
        <div className="bg-slate-800  max-w-lg mx-auto my-4 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Captured Image</h2>
          {capturedImage && (
            <>
              <img src={capturedImage} alt="Captured" className="w-full rounded-lg border border-gray-300" style={{ width: "100%" }} />
              <div className="mt-4 flex justify-center">
                <button onClick={predictResponse} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                  Predict Response
                </button>
              </div>
              {/* Conditional rendering for loading indicator */}
              {isLoading && (
                <div className="mt-4 flex items-center justify-center">
                  <span className="loading loading-bars loading-sm"></span>
                </div>
              )}
              {/* Display prediction response if available */}
              {predictionResponse && !isLoading && (
                <div className="mt-4">
                  {/* <h2 className="text-lg font-semibold mb-2">Prediction Response is</h2>
                  
                  <h1 className='text-3xl text-center'>{predictionResponse}</h1> */}
                  <div>
                    <PredictedResponse response={predictionResponse}> </PredictedResponse>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
