import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Current Time
        </h1>
        <p className="text-xl text-gray-600 mt-2">{time}</p>
      </div>
    </div>
  );
};

export default TimeDisplay;
