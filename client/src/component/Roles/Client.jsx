import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './client.css';  // Make sure to rename the CSS file to match the component

const Client = () => {
    const [timerRunning, setTimerRunning] = useState(false);
    const [activeTime, setActiveTime] = useState(0);
    const [inactiveTime, setInactiveTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [developData, setDevelopData] = useState([]);
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [charging, setCharging] = useState(false);
    const [batteryWarning, setBatteryWarning] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/')
            .then(response => {
                const data = response.data;
                setDevelopData(data);
                calculateTotalDuration(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        
        const updateBatteryStatus = async () => {
            try {
                const battery = await navigator.getBattery();
                setBatteryLevel(battery.level * 100);
                setCharging(battery.charging);
                setBatteryWarning(battery.level * 100 < 20);
                
                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(battery.level * 100);
                    setBatteryWarning(battery.level * 100 < 20);
                });
                battery.addEventListener('chargingchange', () => {
                    setCharging(battery.charging);
                });
            } catch (error) {
                console.error('Error fetching battery status:', error);
            }
        };

        updateBatteryStatus();
    }, []);

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

        axios.post('http://127.0.0.1:8000/timer', { timerRunning: newTimerState })
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
            <div className="battery-card">
                    <h3>Battery Status</h3>
                    <p>Battery Level: {batteryLevel}%</p>
                    <b className={charging ? 'charging' : 'not-charging'}>
                        {charging ? 'Charging' : 'Not Charging'}
                    </b>
                    {batteryWarning && <p className="warning">Low Battery! Please plug in your device.</p>}
                </div>
        </div>
    );
};

export default Client;
