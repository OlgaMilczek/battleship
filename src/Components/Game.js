import React, {useState, useEffect} from 'react'; 

import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

import {gameStates, SIZE, ships} from '../Helpers/constants';

function Game(props) {
    const [shipsMoved, setShipsMoved] = useState(false);

    let opponentContent;
    let opponentHeader;
    let player = props.game.players[1];

    useEffect(() => {
        if (shipsMoved) {
            setShipsMoved(false);
        }
    }, [shipsMoved]);

    const newRandomPlacement = () => {
        player.placeShipRandom(SIZE, ships);
        setShipsMoved(true);
    };
    if (props.gameStatus ===  gameStates.SHIP_PLACEMENT) {
        opponentHeader = 'Place your ship';
        opponentContent = <div className='m-gameInfo'>
            <p>Double click to rotate your ship, drag and drop to move ship <br />
            or click button for new random placement. </p>
            <button className='eightbit eightbit-btn' onClick={newRandomPlacement}>Place random</button>
            <p> When you are done click Start Game button to start.</p>
            {props.startButton}
        </div>;
    } else {
        opponentHeader = 'Computer board';
        opponentContent = <OpponentBoard player={player} playRound={props.game.playRound}/>;
    }

    return (
        <div>
            <div className='preparation'>
                <h2>Your board</h2>
                <h2>{opponentHeader}</h2>
                <PlayerBoard player={player} gameStatus={props.gameStatus} shipMoved = {setShipsMoved}/>
                {opponentContent}
            </div>
        </div>
    );
}

export default Game;