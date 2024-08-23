import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './client.css';

const Client = () => {
    const [timerRunning, setTimerRunning] = useState(false);
    const [activeTime, setActiveTime] = useState(0);
    const [inactiveTime, setInactiveTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [developData, setDevelopData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/')
            .then(response => {
                const data = response.data;
                setDevelopData(data);
                calculateTotalDuration(data); // Call the function here
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [developData]); // Dependency array should be empty to run only once

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

    const handleTimerToggle = () => {
        const newTimerState = !timerRunning;
        setTimerRunning(newTimerState);

        axios.post('http://127.0.0.1:8000/timer', {
          timerRunning: newTimerState
        })
        .then(response => {
          console.log('Timer state updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating timer state:', error);
        });
    };

    return (
        <div className='con'>
            <div className="statss">
                <div className="total-times">
                    <h3>Total Time Today</h3>
                    <h2>{formatTime(totalTime)}</h2>
                    <p>Active time: {formatTime(activeTime)}</p>
                    <p>Inactive time: {formatTime(inactiveTime)}</p>
                    <p>Week 29h 35m / Month 89h 03m</p>
                    <button onClick={handleTimerToggle}>
                        {timerRunning ? 'Stop' : 'Start'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Client;
