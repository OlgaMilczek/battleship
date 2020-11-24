import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import WelcomeSite from './Components/WelcomeSite';

function App() {
    const [gameStatus, setGameStatus] = useState('not started');
    const [playerName, setPlayerName] = useState('');
    const [game, setGame] = useState('');

    useEffect(() => {
        if (playerName !== '') {
        //Jak się zmienia imię zmień status gry na 'preparing'
        //I ustaw nową grę z computerem.
            setGame(new Game(playerName, 'computer'));
            setGameStatus('preparing');
        }
    }, [playerName]);

    if (gameStatus === 'not started') {
        return <WelcomeSite setPlayerName ={setPlayerName}/>;
    }

    if (gameStatus === 'preparing') {
        return (
            <div>
                <h1 class='title' >Battleships</h1>
              Let's place your ship.
            </div>
        );
    }
}

export default App;
