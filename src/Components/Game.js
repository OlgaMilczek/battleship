import React from 'react'; 

import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

function Game(props) {

    return (
        <div>
            <h1 className='title'>Battleships</h1>
            <div className='preparation'>
                <h2>Your board</h2>
                <h2>Computer board</h2>
                <PlayerBoard player={props.game.players[1]} />
                <OpponentBoard player={props.game.players[1]} playRound={props.game.playRound}/>
            </div>
        </div>
    );
}

export default Game;