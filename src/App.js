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
            setGameStatus(gameStates.PREPARING.GAME_OVER);
        }
    }, [winner]);

    const startNewGame = () => {
        setGameStatus(gameStates.PREPARING);
    };

    if (gameStatus === gameStates.PREPARING) {
        game = new Game(gameMode, setMoveMade, setWinner);
        setGameStatus(gameStates.SHIP_PLACEMENT);
    }
    
    return (
        <div>
            <GameRender game = {game}/>
            {gameStatus === gameStates.PREPARING.GAME_OVER ? <GameOver startNewGame={startNewGame} winner={winner}/> : null}
        </div>
    );
}

export default App;
