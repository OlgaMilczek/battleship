import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import GameOver from './Components/GameOver';
import GameRender from './Components/Game';

import {gameModes, gameStates} from './Helpers/constants';

let game = undefined;

function App() {
    const [gameStatus, setGameStatus] = useState(gameStates.PREPARING);
    const [moveMade, setMoveMade] = useState(false);
    const [winner, setWinner] = useState('');
    //For future development of two players mode.
    const [gameMode, setGameMode] = useState(gameModes.ONE_PLAYER);

    useEffect(() => {
        if (moveMade === true) {
            setMoveMade(false);
        }
    }, [moveMade]); 

    useEffect(() => {
        if (winner !== '') {
            setGameStatus(gameStates.GAME_OVER);
        }
    }, [winner]);

    const startNewGame = () => {
        setGameStatus(gameStates.PREPARING);
    };

    const startButton = <button className='eightbit eightbit-btn' onClick={() => setGameStatus(gameStates.GAME_RUNNING)}>Start game</button>;

    if (gameStatus === gameStates.PREPARING) {
        game = new Game(gameMode, setMoveMade, setWinner);
        setGameStatus(gameStates.SHIP_PLACEMENT);
    }
    
    return (
        <div>
            <h1 className='title'>Battleships</h1>
            <GameRender game = {game} gameStatus={gameStatus} startButton = {startButton}/>
            {gameStatus === gameStates.GAME_OVER ? <GameOver startNewGame={startNewGame} winner={winner}/> : null}

        </div>
    );
}

export default App;
