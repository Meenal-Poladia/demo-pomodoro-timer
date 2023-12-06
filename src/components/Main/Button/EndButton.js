import React from 'react';

const EndButton = ({isTimer}) => {
    const handleClick = () => {
        isTimer(false);
    }
    return (
        <div>
            <button type="submit"
                    onClick={handleClick}
                    className="btn btn-danger">
                End
            </button>
        </div>
    );
};

export default EndButton;