import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTime, setActiveTime] = useState(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [developData, setDevelopData] = useState([]);
  function calculateTotalDuration() {
    let active = 0;
    let inactive =0;

    developData.forEach((item) => {
      const durationParts = item.duration.split(':');
      const hours = parseInt(durationParts[0], 10);
      const minutes = parseInt(durationParts[1], 10);
      const secondsParts = durationParts[2].split('.');
      const seconds = parseInt(secondsParts[0], 10);
      const milliseconds = parseInt(secondsParts[1], 10);
  
      const durationInSeconds = hours * 3600 + minutes * 60 + seconds ;
      if(item.app_name=='Unknown' || item.app_name=='Start' ||item.app_name=='Search' ) inactive+=durationInSeconds
      else active += durationInSeconds;
    });
    setInactiveTime(inactive)
    setActiveTime(active);
    setTotalTime(active+inactive)
  }
 
  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setActiveTime(activeTime + 1);
        setTotalTime(totalTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, activeTime, totalTime]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => {
        setDevelopData(data);
        calculateTotalDuration(); // Call the function here
      });
  }, [developData]);

  

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="stats">
        <div className="total-time">
          <h3>Total Time Today</h3>
          <h2>{formatTime(totalTime)}</h2>
          <p>Active time: {formatTime(activeTime)}</p>
          <p>Inactive time: {formatTime(inactiveTime)}</p>
          <p>Week 29h 35m / Month 89h 03m</p>
          <button onClick={handleStartStop}>{timerRunning ? 'Stop' : 'Start'}</button>
        </div>
        <div className="app-usage">
          <h3>Latest Screenshots</h3>
          
        </div>
      </div>
      <div className="develop">
        <h3>Employee Activity Status </h3>
        <div className="table">
            <div className="header">
            <div className="cell">Start Time</div>
            <div className="cell">Duration</div>
            <div className="cell">App Name</div>
            </div>
            {developData.map((item, index) => (
                item.app_name !== "" ? (
                    <div className="row" key={index}>
                    <div className="cell">{item.start_time}</div>
                    <div className="cell">{item.duration}</div>
                    <div className=" app-name">{item.app_name}</div>
                    </div>
                ) : null
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;