// -----------------------------------------2
/*
import React, { useState, useEffect } from "react";

const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    return <div>{formattedTime}</div>;
};

export default Timer;*/


// ---------------------3
/*
import React, { useState, useEffect } from 'react';

const Timer = ({ startTimer, minutes, seconds }) => {
    const [remainingTime, setRemainingTime] = useState(minutes * 60 + seconds);

    useEffect(() => {
        let interval = null;
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [remainingTime]);

    const minutesLeft = Math.floor(remainingTime / 60);
    const secondsLeft = remainingTime % 60;

    return (
        <div>
            <p>{`${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`}</p>
        </div>
    );
};

export default Timer;*/


import React, {useCallback, useEffect, useState} from 'react';

const Timer = () => {
    const [minutes, setMinutes] = useState(0);
    const [isTimerSet, setIsTimerSet] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    const decrementTimer = useCallback(() => {
        setRemainingSeconds((oldSeconds) => oldSeconds - 1)
    }, []);

    useEffect(() => {
        if (remainingSeconds <= 0) {
            return
        }
        const timeoutFunction = setInterval(decrementTimer, 1000)
        return () => clearInterval(timeoutFunction);
    }, [decrementTimer, remainingSeconds]);


    function handleSliderChange(event) {
        setMinutes(event.target.value);
    }

    function toggleSetTimer() {
        if (minutes == 0) {
            return;
        }
        setIsTimerSet(!isTimerSet);
        setRemainingSeconds(minutes * 60);
    }

    function handleStartTimer() {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {

            /*const id = setInterval(() => {
                console.log(remainingSeconds);
                const newSecond = remainingSeconds - 1
                setRemainingSeconds(newSecond);
            }, 1000);*/
            setIntervalId(10);
        }
    }

    function pauseTimer() {

    }

    function showTime() {
        // calculate reamining time from seconds
        const minutesLeft = Math.floor(remainingSeconds / 60);
        const secondsLeft = remainingSeconds % 60;
        console.log("called");
        return (
            <div>
                <span>{minutesLeft < 10 ? '0' : ''}{minutesLeft}</span> : <span>{secondsLeft < 10 ? '0' : ''}{secondsLeft}</span>
            </div>
        );

    }

    return (
        <div>
            {!isTimerSet &&
                <div>
                    <div>
                        <label htmlFor="minutes">{minutes}</label>
                    </div>
                    <input type="range" max={60} min={0} step={5} id="minutes" value={minutes} onInput={handleSliderChange}/>
                    <button className="btn btn-primary" onClick={toggleSetTimer}>Set</button>
                </div>
            }

            {
                isTimerSet &&
                    <div>
                        <div>
                            {remainingSeconds}
                            {/*{showTime()}*/}
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary" onClick={handleStartTimer}>Start</button>
                            <button type="button" className="btn btn-danger" onClick={toggleSetTimer}>Cancel/Reset</button>
                            <button type="button" className="btn btn-danger" onClick={pauseTimer}>Pause</button>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Timer;
