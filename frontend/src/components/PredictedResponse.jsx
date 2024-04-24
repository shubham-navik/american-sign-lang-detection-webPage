import { useState } from "react";
import audiowave from '../assets/icons8-audio-wave.gif'

const PredictedResponse = ({ response }) => {
  const [speaking, setSpeaking] = useState(false);

  const speakText = () => {
    setSpeaking(true);
    const text = "Predicted Text is " + response;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className=" relative max-w-md mx-auto my-4 p-4 border border-gray-200 rounded-lg">
      {speaking && <div className=" absolute top-4 right-4"> <img src={audiowave}  /></div>}
      <button onClick={speakText} className="btn btn-active">SPEAK</button>
      {/* <h2 className="text-lg font-semibold mb-2">Predicted Response is</h2> */}
      <p className="text-slate-100 text-center text-4xl">{response}</p>
    </div>
  );
};

export default PredictedResponse;
