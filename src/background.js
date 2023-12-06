console.log(`I am in Background JS`);
let timerId = null;

let minutes = null;
let seconds = null;


const startTimer = (payload) => {
    minutes = +payload.timerMinutes;
    seconds = +payload.timerSeconds;

    if (timerId) {
        return;
    }

    timerId = setInterval(function() {
        if (minutes === 0 && seconds === 0) {
            chrome.runtime.sendMessage({
                message: 'tick',
                timerMinutes: minutes,
                timerSeconds: seconds
            });
            clearInterval(timerId);
        }

        if (seconds > 0) {
            seconds--
        }

        if (seconds === 0 && minutes > 0) {
            minutes--;
            seconds = 59;
        }


        chrome.runtime.sendMessage({
            message: 'tick',
            timerMinutes: minutes,
            timerSeconds: seconds
        });

    }, 1000);
}

const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
    // chrome.runtime.sendMessage("stop");
}

//Receiving messages for implementing stretch and water time interval
chrome.runtime.onMessage.addListener((payload, sender, sendResponse) => {
    if (payload.message === "start-timer") startTimer(payload);
    else if (payload.message === "stop-timer") stopTimer();
    return true;
});