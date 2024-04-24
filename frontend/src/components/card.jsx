import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const Card = ({ contributers }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {contributers.map((contributer, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
          {/* <img src={`https://via.placeholder.com/300x200?text=Image${index + 1}`} alt={`Image ${index + 1}`} className="w-full" /> */}
              <div className="px-6 py-4">
                  <div className='flex items-center text-start'>
                  <FaUserCircle  className='text-2xl mr-2'/>
                      <div className="font-bold text-2xl mb-2 hover:text-slate-100">{contributer.user}</div>
                  </div>
            <p className=" text-base py-4 text-indigo-400">{contributer.Role}</p>
            <p className="text-black text-base font-semibold">{contributer.discription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
