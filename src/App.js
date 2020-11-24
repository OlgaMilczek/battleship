import React, {useState, useEffect} from 'react';

import Game from './GameLogic/Game';

import WelcomeSite from './components/WelcomeSite';

function App() {
    const [gameStatus, setGameStatus] = useState('not started');
    const [playerName, setPlayerName] = useState('');
    const [game, setGame] = useState('');

    useEffect(() => {
        //Jak się zmienia imię zmień status gry na 'preparing'
        //I ustaw nową grę z computerem.
        setGame(new Game(playerName, 'computer'));
        setGameStatus('preparing');
    }, [playerName]);

    if (gameStatus === 'not started') {
        return <WelcomeSite setPlayerName ={setPlayerName}/>;
    }

    if (gameStatus === 'preparing') {
        return (
            <div>
          Let's place your ship.
            </div>
        );
    }
}

export default App;
