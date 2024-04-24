import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import axios from 'axios';
import Navbar from './components/Navbar';
import allImg from './assets/asl.png'
import Footer from './components/Footer';
import Cards from './components/Cards';

const App = () => {
  const [predictionResponse, setPredictionResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const predictResponse = (imageSrc) => {
    setIsLoading(true);
    axios.post('/predict', { image: imageSrc })
      .then(response => {
        setPredictionResponse(response.data.prediction);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return (

    <>
      
      <Navbar/>

      <div>
          <h1 className="text-5xl text-center pt-16 pb-16 font-bold bg-indigo-800   text-black">American Sign Language Recognition</h1>
      </div>
    
      <div className=" bg-indigo-800 flex flex-col items-center  ">     
            <CameraCapture  onImageCapture={predictResponse} />
            {isLoading && <div className="mt-4 text-blue-500">Loading...</div>}
        {predictionResponse && <div className="mt-4 text-green-500">Prediction: {predictionResponse}</div>}
        
      <div className='m-8'>
        <img className='w-92 h-92' src={allImg} />
      </div>
      </div>
      
      <div className='flex flex-row md:flex-col'>
        <Cards/>
      </div>

      <div>
          <Footer/>
      </div>



      </>
  );
};

export default App;
