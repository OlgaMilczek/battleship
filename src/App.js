import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import WelcomeSite from './Components/WelcomeSite';
import GameOver from './Components/GameOver';
import GameRender from './Components/Game';


let game = undefined;

function App() {
    const [gameStatus, setGameStatus] = useState('not started');
    const [playerName, setPlayerName] = useState('');
    const [moveMade, setMoveMade] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [boardRearrange, setBoardRearrange] = useState(false);

    useEffect(() => {
        if (playerName !== '') {
        //Jak się zmienia imię zmień status gry na 'preparing'
        //I ustaw nową grę z computerem.
            setGameStatus('preparing');
        }
        if (gameOver) {
            setGameStatus('game over');
        }
    }, [playerName, gameOver]);

    useEffect(() => {
        if (moveMade === true)
            setMoveMade(false);
    }, [moveMade]);

    useEffect(() => {
        if (boardRearrange === true)
            setBoardRearrange(false);
    }, [boardRearrange]);

    const startNewGame = () => {
        setGameStatus('preparing');
    };



    if (gameStatus === 'not started') {
        return <WelcomeSite setPlayerName ={setPlayerName}/>;
    }

    if (gameStatus === 'preparing') {
        game = new Game(playerName, 'computer', setMoveMade, setGameOver);
        setGameStatus('running');
    }

    if (gameStatus === 'game over') {
        return <GameOver startNewGame={startNewGame}/>;
    }
    
    return (
        <GameRender game = {game} setBoardRearrange={setBoardRearrange}/>
    );
}

export default App;
