import React from 'react'; 

import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

function Game(props) {

    return (
        <div>
            <div className='preparation'>
                <h2>Your board</h2>
                <h2>Computer board</h2>
                <PlayerBoard player={props.game.players[1]} gameStatus={props.gameStatus}/>
                <OpponentBoard player={props.game.players[1]} playRound={props.game.playRound} gameStatus={props.gameStatus}/>
            </div>
        </div>
    );
}

export default Game;