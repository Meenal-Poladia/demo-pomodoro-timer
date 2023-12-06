import React, {useEffect} from 'react';
import {STATUS} from "../../../utils/constants";

const BreakTimer = ({hasBreakTimerStarted}) => {
    const [minutes, setMinutes] = React.useState(25);
    const [seconds, setSeconds] = React.useState(0);
    const [displayMessage, setDisplayMessage] = React.useState(false);
    const [status, setStatus] = React.useState(STATUS.default);
    const intervalRef = React.useRef();

    useEffect(() => {
        if(status === STATUS.start){
            intervalRef.current = setInterval(() => {
                countDown()
            }, 1000);
        }
        else if(status === STATUS.pause && intervalRef.current){
            clearInterval(intervalRef.current)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [minutes, seconds, status]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    function countDown(){
        if (seconds === 0) {
            if (minutes !== 0) {
                setSeconds(59);
                setMinutes(min => min - 1); // try using callback form to prevent stale data
            } else {
                let mins = displayMessage ? 24 : 4;
                let sec = 59;
                setSeconds(sec);
                setMinutes(mins);
                setDisplayMessage(value => !value);// try using callback form to prevent stale data
            }
        } else {
            setSeconds(sec => sec - 1);// try using callback form to prevent stale data
        }
    }

    const start = () => {
        hasBreakTimerStarted(true);
        setStatus(STATUS.start)
    };
    // const pause = () => {
    //     setStatus(STATUS.pause)
    //     hasTimerStarted(false);
    // };
    const stop = () => {
        hasBreakTimerStarted(false);
        setStatus(STATUS.pause);
        setMinutes(25);
        setSeconds(0);
    }

    return (
        <div className="timer">
            <h2>
                {timerMinutes}:{timerSeconds}
            </h2>
            <button className="buttons_new" onClick={start}>Start</button>
            {/*<button className="buttons_new" onClick={pause}>Pause</button>*/}
            <button className="buttons_new" onClick={stop}>Stop</button>
        </div>
    );
};

export default BreakTimer;