import React, {useEffect, useState} from 'react';
import Title from "./Title/Title";
import Timer from "./Timer/Timer";
import BreakTimer from "./BreakTimer/BreakTimer";
import {chromeStorageGetPromise, chromeStorageSetPromise} from "../../api/chrome";

const Main = () => {
    const [hasTimerStarted, setHasTimerStarted] = useState(false);
    const [hasBreakTimerStarted, setHasBreakTimerStarted] = useState(false);

    useEffect(() => {
        chromeStorageGetPromise(["hasTimerStarted", "hasBreakTimerStarted"])
            .then((values) => {
                setHasTimerStarted(values.hasTimerStarted);
                setHasBreakTimerStarted(values.hasBreakTimerStarted);
            })
    }, []);


    const handleTimer = (value) => {
        chromeStorageSetPromise(
        {
                    timer: {
                        break: {
                            minutes: 10,
                            seconds: 50,
                            started: true
                        },
                        work: {
                            minutes: 10,
                            seconds: 50,
                            started: true,
                            paused: false
                        }
                    }
            }
        )
            .then(() => setHasTimerStarted(value))
    }

    const handleBreakTimer = (value) => {
        chromeStorageSetPromise({hasBreakTimerStarted: value})
            .then(() => setHasBreakTimerStarted(value))
    }

    return (
        <div className="main">
            <Timer hasTimerStarted={handleTimer} hasBreakTimerStarted={hasBreakTimerStarted}/>
            <Title message="Resume writing and finalising"/>
            <div className="module">


            </div>
            {/*<div className="module">
                <Title message="Take a break and Relax"/>
                <BreakTimer hasBreakTimerStarted={handleBreakTimer} timerStatus={hasTimerStarted}/>
            </div>*/}

        </div>
    );
};

export default Main;