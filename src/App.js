import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import GameOver from './Components/GameOver';
import GameRender from './Components/Game';


let game = undefined;

function App() {
    const [gameStatus, setGameStatus] = useState('preparing');
    const [moveMade, setMoveMade] = useState(false);
    const [winner, setWinner] = useState('');
    //For future development of two players mode.
    const [gameMode, setGameMode] = useState('one player');

    useEffect(() => {
        if (moveMade === true) {
            setMoveMade(false);
        }
    }, [moveMade]);

    useEffect(() => {
        if (winner !== '') {
            setGameStatus('game over');
        }
    }, [winner]);

    const startNewGame = () => {
        setGameStatus('preparing');
    };

    if (gameStatus === 'preparing') {
        game = new Game(gameMode, setMoveMade, setWinner);
        setGameStatus('ship placement');
    }
    
    return (
        <div>
            <GameRender game = {game}/>
            {gameStatus === 'game over'? <GameOver startNewGame={startNewGame} winner={winner}/> : null}
        </div>
    );
}

export default App;
