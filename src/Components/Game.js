import React from 'react'; 

import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

function Game(props) {
    const playerNr = 1;
    const onClick = () => {
        props.game.placeShipRandom(playerNr);
        props.setBoardRearrange(true);
    };

    return (
        <div>
            <h1 className='title'>Battleships</h1>
            <div className='preparation'>
                <h2>Your board</h2>
                <h2>Computer board</h2>
                <PlayerBoard player={props.game.players[playerNr]} />
                <OpponentBoard player={props.game.players[playerNr]} playRound={onClick}/>
                <button className = 'eightbit eightbit-btn' onClick={() => onClick }>Rearrange</button>
            </div>
        </div>
    );
}

export default Game;