import Player from './Player';
import {computerMove} from './computerMoves';

import {ships, SIZE} from '../Helpers/constants';

class Game {
    constructor(gameMode, setMoveMade, setWinner) {
        this.checkMove = this.checkMove.bind(this);
        this.playRound = this.playRound.bind(this);
        this.checkForGameOver = this.checkForGameOver.bind(this);
        this.players = this.setPlayers(gameMode);
        this.currentPlayer = 1;
        this.gameOver = false;
        this.ships = ships;
        this.players[1].placeShipRandom(SIZE, this.ships);
        this.players[2].placeShipRandom(SIZE, this.ships);
        this.setMoveMade = setMoveMade;
        this.setWinner = setWinner;
        this.winner = 0;
    }

    setPlayers(gameMode) {
        let players = {};
        if (gameMode === 'one player') {
            players = {
                1: new Player(1, false, this.checkMove, SIZE),
                2: new Player(2, true, this.checkMove, SIZE)
            };
        } else if (gameMode === 'two player') {
            players = {
                1: new Player(1, false ,this.checkMove, SIZE),
                2: new Player(2, false ,this.checkMove, SIZE)
            };
        } else {
            throw new Error('Wrong number of players!');
        }
        return players;

    }

    checkMove(coordinates, playerNr) {
        let opponent;
        if (playerNr === 1) {
            opponent = this.players[2];
        } else if (playerNr === 2){
            opponent = this.players[1];
        }    
        else {
            throw new Error ('Something is wrong! There should be only two players');
        }
        const [opponentHit, opponentSunk] = opponent.gameBoard.receiveAttack(coordinates);
        return [opponentHit, opponentSunk];
    }

    checkForGameOver() {
        const opponentNr = (this.currentPlayer === 1 ? 2 : 1);
        const opponentBoard = this.players[opponentNr].gameBoard;
        const shipsLength = Object.keys(opponentBoard.ships).length;
        if (opponentBoard.sunkShip === shipsLength) {
            this.gameOver = true;
            this.setWinner(this.currentPlayer);
        }
    }

    playRound(playerNr, coordinates) {
        if (!this.gameOver) {
            const thisPlayer = this.players[playerNr];
            if (playerNr !== this.currentPlayer) {
                return;
            }
            const moveMade = thisPlayer.makeMove(coordinates);
            if(moveMade) {
                this.checkForGameOver();
                if ( this.currentPlayer === 1) {
                    this.currentPlayer = 2;
                } else {
                    this.currentPlayer = 1;
                }
            }
            if (this.players[this.currentPlayer].isComputer) {
                const randomCoordinates = computerMove();
                this.playRound(this.currentPlayer, randomCoordinates);
            }
            this.setMoveMade(true);
        }
    }
}

export default Game;