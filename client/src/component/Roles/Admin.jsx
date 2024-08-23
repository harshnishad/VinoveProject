import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import './admin.css';
import './client.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeTime, setActiveTime] = useState(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [developData, setDevelopData] = useState([]);
  const [inputTime, setInputTime] = useState(''); // State for form input
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then(response => {
        setDevelopData(response.data);
        calculateTotalDuration(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setSubmissionStatus('Error fetching data.');
      });
  }, [developData]);

  const calculateTotalDuration = (data) => {
    let active = 0;
    let inactive = 0;

    data.forEach((item) => {
      const durationParts = item.duration.split(':');
      const hours = parseInt(durationParts[0], 10);
      const minutes = parseInt(durationParts[1], 10);
      const secondsParts = durationParts[2].split('.');
      const seconds = parseInt(secondsParts[0], 10);

      const durationInSeconds = hours * 3600 + minutes * 60 + seconds;
      if (item.app_name === 'Unknown' || item.app_name === 'Start' || item.app_name === 'Search') {
        inactive += durationInSeconds;
      } else {
        active += durationInSeconds;
      }
    });
    setInactiveTime(inactive);
    setActiveTime(active);
    setTotalTime(active + inactive);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = developData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://127.0.0.1:8000/screenshot', {
      time: parseInt(inputTime, 10),
    })
    .then(response => {
      setSubmissionStatus('Screenshot taken successfully!');
      setInputTime(''); // Clear input field after submission
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      setSubmissionStatus('Error taking screenshot.');
    });
  };

  return (
    <div className="container">
      <div className="stats">
        <div className="total-time">
          <div className="total-times">
            <h3>Total Time Today</h3>
            <h2>{formatTime(totalTime)}</h2>
            <p>Active time: {formatTime(activeTime)}</p>
            <p>Inactive time: {formatTime(inactiveTime)}</p>
            <p>Week 29h 35m / Month 89h 03m</p>
          </div>
        </div>
        <div className="app-usage">
          <form onSubmit={handleSubmit}>
            <div>
              <h1>Enter Time To Take ScreenShot</h1>
              <input 
                type="number" 
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
              />
            </div>
            <div className='btn'>
              <button type="submit">Input</button>
            </div>
          </form>
          {submissionStatus && <p>{submissionStatus}</p>}
          <h3>Latest Screenshots</h3>
         
          <img src="" alt="Admin Dashboard Image" /> 
        </div>
      </div>
      <div className="develop">
        <h3>Employee Activity Status</h3>
        <div className="table">
          <div className="header">
            <div className="cell">Start Time</div>
            <div className="cell">Duration</div>
            <div className="cell">App Name</div>
          </div>
          {currentItems.map((item, index) => (
            item.app_name !== "" ? (
              <div className="row" key={index}>
                <div className="cell">{item.start_time}</div>
                <div className="cell">{item.duration}</div>
                <div className="app-name">{item.app_name}</div>
              </div>
            ) : null
          ))}
        </div>
        <div className="pagination">
          {Array(Math.ceil(developData.length / 10)).fill(0).map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
