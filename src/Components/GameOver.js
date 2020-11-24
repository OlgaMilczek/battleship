import React from 'react';

const GameOver = (props) => {

    return (
        <div className='o-welcome'>
            <h1 className='title' >Battleships</h1>
            <div className='newGame'>
                <h3>Game over</h3>
                <button className ='eightbit eightbit-btn' onClick={props.startNewGame}>Play again</button>
            </div>
        </div>
    );
};

export default GameOver;