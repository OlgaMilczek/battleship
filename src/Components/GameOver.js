import React from 'react';

function GameOver(props) {
    let content;
    if (props.winner===1) {
        content = 'You win! Congratulations!';
    } else {
        content = 'Computer wins! Try again!';
    }

    return (
        <div className='o-popup'>
            <div className = 'o-popup-overlay'></div>
            <div className='newGame eightbit'>
                <h2>Game over!</h2>
                <h3>{content}</h3>
                <div onClick={props.startNewGame} className='eightbit eightbit-btn'>Play again</div>
            </div>
        </div>
    );
}

export default GameOver;