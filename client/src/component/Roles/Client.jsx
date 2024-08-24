import React, { useState, useEffect } from "react";
import axios from "axios";
import "./client.css"; // Make sure to rename the CSS file to match the component
import TimeDisplay from "../TimeDisplay"
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
        axios
            .get("http://127.0.0.1:8000/")
            .then((response) => {
                const data = response.data;
                setDevelopData(data);
                calculateTotalDuration(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        const updateBatteryStatus = async () => {
            try {
                const battery = await navigator.getBattery();
                setBatteryLevel(battery.level * 100);
                setCharging(battery.charging);
                setBatteryWarning(battery.level * 100 < 20);

                battery.addEventListener("levelchange", () => {
                    setBatteryLevel(battery.level * 100);
                    setBatteryWarning(battery.level * 100 < 20);
                });
                battery.addEventListener("chargingchange", () => {
                    setCharging(battery.charging);
                });
            } catch (error) {
                console.error("Error fetching battery status:", error);
            }
        };
        updateBatteryStatus();

    }, [developData]);

    const calculateTotalDuration = (data) => {
        let active = 0;
        let inactive = 0;

        data.forEach((item) => {
            const durationParts = item.duration.split(":");
            const hours = parseInt(durationParts[0], 10);
            const minutes = parseInt(durationParts[1], 10);
            const secondsParts = durationParts[2].split(".");
            const seconds = parseInt(secondsParts[0], 10);

            const durationInSeconds = hours * 3600 + minutes * 60 + seconds;
            if (
                item.app_name === "Unknown" ||
                item.app_name === "Start" ||
                item.app_name === "Search"
            ) {
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
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleTimerToggle = () => {
        const newTimerState = !timerRunning;
        setTimerRunning(newTimerState);

        axios
            .post("http://127.0.0.1:8000/timer", { timerRunning: newTimerState })
            .then((response) => {
                console.log("Timer state updated:", response.data);
            })
            .catch((error) => {
                console.error("Error updating timer state:", error);
            });
    };

    return (
        <div className="con">
            <div className="flex items-center justify-center min-h-20 rounded-xl bg-gray-300 p-4 gap-8">
                <div>
                
                    {/* Active Time Section */}
                    <div className="flex flex-col items-center justify-center bg-blue-300 p-5 my-2 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                            Active Time:
                        </h1>

                        <div className="text-5xl font-extrabold text-white bg-blue-500 p-8 rounded-lg shadow-lg">
                            {formatTime(activeTime)}
                        </div>
                    </div>

                    {/* Inactive Time Section */}
                    <div className="flex flex-col items-center justify-center bg-red-200 p-6 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                            Inactive Time:
                        </h1>
                        <div className="text-4xl font-medium text-gray-600 bg-gray-300 p-6 rounded-lg shadow-md">
                            {formatTime(inactiveTime)}
                        </div>
                    </div>

                    {/* Total Times Section */}
                    <div className="flex items-center justify-center w-full max-w-md mt-8">
                        <button
                            onClick={handleTimerToggle}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            {timerRunning ? "Stop" : "Start"}
                        </button>
                    </div>
                </div>
            
                <div>
                <TimeDisplay />
                    <div className="battery-card my-7">
                        <h3>Battery Status</h3>
                        <p>Battery Level: {batteryLevel}%</p>
                        <b className={charging ? "charging" : "not-charging"}>
                            {charging ? "Charging" : "Not Charging"}
                        </b>
                        {batteryWarning && (
                            <p className="warning">Low Battery! Please plug in your device.</p>
                        )}
                    </div>
                    <div className="h-40 bg-blue-500 rounded-t-xl p-1 py-2 ">
                        <h3 className="text-center text-white font-bold">Keep Notes</h3>
                       <div className="text-white">
                       <p className="font-serif">
                        Continuous improvement 
                        </p>
                        <p className="font-serif">
                        is better than
                        </p>
                        <p className="font-serif"> delayed perfection.</p>
                       </div>
                    </div>
                </div>


            </div>
 

           

        </div>
    );
};

export default Client;
