import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import GameOver from './Components/GameOver';
import GameRender from './Components/Game';

let game = undefined;
const gameStates = {
    PREPARING: 'preparing',
    GAME_OVER: 'game over',
    SHIP_PLACEMENT: 'ship placement',
    GAME_RUNNING: 'game running'
};

const gameModes = {
    ONE_PLAYER: 'one player', 
    TWO_PLAYERS: 'two_players'
};

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

    const startButton = (
        <div className='m-startGame'>
            <p>Place yours ship and start the game.</p>
            <button className='eightbit eightbit-btn' onClick={() => setGameStatus(gameStates.GAME_RUNNING)}>Start game</button>
        </div>
    );

    if (gameStatus === gameStates.PREPARING) {
        game = new Game(gameMode, setMoveMade, setWinner);
        setGameStatus(gameStates.SHIP_PLACEMENT);
    }
    
    return (
        <div>
            <h1 className='title'>Battleships</h1>
            <GameRender game = {game} gameStatus={gameStatus}/>
            {gameStatus === gameStates.SHIP_PLACEMENT ? startButton : null}
            {gameStatus === gameStates.GAME_OVER ? <GameOver startNewGame={startNewGame} winner={winner}/> : null}

        </div>
    );
}

export default App;
