import React from 'react';

const StartButton = ({isTimer}) => {
    const handleClick = () => {
        isTimer(true);
    }

    return (
        <div>
            <button type="submit"
                    className="btn btn-success"
                    onClick={handleClick}>
                Start Task
            </button>
        </div>

    );
};

export default StartButton;