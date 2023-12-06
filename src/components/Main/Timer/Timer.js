import React, {useEffect, useState} from 'react';
import {STATUS} from "../../../utils/constants";
import {chromeStorageGetPromise, chromeStorageSetPromise, sendMessageToRuntime} from "../../../api/chrome";

const Timer = ({hasTimerStarted, hasBreakTimerStarted}) => {
    const [minutes, setMinutes] = useState("25");
    const [seconds, setSeconds] = useState("00");
    const [displayMessage, setDisplayMessage] = React.useState(false);
    const [status, setStatus] = React.useState(STATUS.default);
    const intervalRef = React.useRef();


    useEffect(() => {
        chromeStorageGetPromise(["hasBreakTimerStarted"])
            .then((value) => {
                if (value.hasBreakTimerStarted) pause();
            })
    }, [hasBreakTimerStarted])

    useEffect(() => {
        if(status === STATUS.start){
            intervalRef.current = setInterval(() => {
                countDown()
            }, 1000);
        } else if(status === STATUS.pause && intervalRef.current){
            clearInterval(intervalRef.current)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [minutes, seconds, status]);

    chrome.runtime.onMessage.addListener((payload, sender, sendResponse) => {
        if(payload.message === "start") {
            console.log('started');
        } else if (payload.message === "stop") {
            console.log("stopped");
        }
        if (payload.message === "tick") {
            if(+payload.timerMinutes < 10) {
                setMinutes('0' + payload.timerMinutes);
            }
            else {
                setMinutes(payload.timerMinutes);
            }

            if(+payload.timerSeconds < 10) {
                setSeconds('0' + payload.timerSeconds);
            }
            else {
                setSeconds(payload.timerSeconds);
            }
        }
    });

    function countDown(){
        if (seconds === 0) {
            if (minutes !== 0) {
                setSeconds(59);
                setMinutes(minutes => minutes - 1)// try using callback form to prevent stale data
            } else {
                let mins = displayMessage ? 24 : 4;
                let sec = 59;
                setMinutes(mins);
                setSeconds(sec);
                setDisplayMessage(value => !value);
                // try using callback form to prevent stale data
            }
        } else {
            setSeconds(sec => sec - 1);// try using callback form to prevent stale data
        }
    }

    const start = () => {
        sendMessageToRuntime({message: "start-timer", timerMinutes: minutes, timerSeconds: seconds })
            .then(() => {
                hasTimerStarted(true);
                setStatus(STATUS.start)
            })
    };


    const pause = () => {
        setStatus(STATUS.pause)
        hasTimerStarted(false);

    };
    const stop = () => {
        setMinutes("25")
        hasTimerStarted(false);
        setStatus(STATUS.pause);
        setSeconds("00");

        sendMessageToRuntime({message: "stop-timer"})
            .then(() => {
                hasTimerStarted(false);
                setStatus(STATUS.default)
            })
    }

    return (
        <div className="timer">
            <h3 className="text timer-font-size">
                {minutes} : {seconds}
            </h3>
            <div className="button-group">
                <button className="button-41 blue-colour"
                        onClick={start}>
                    Start
                </button>
                {/*<button className="buttons_new" onClick={pause}>Pause</button>*/}
                <button className="button-41 red-colour"
                        onClick={stop}>
                    Stop
                </button>
            </div>

        </div>
    );
};

export default Timer;