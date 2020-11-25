import Player from './Player';
import {computerMove, randomPosition} from './computerMoves';

const ships = {
    'Carrier': 5, 
    'Battleship': 4, 
    'Destroyer': 3, 
    'Submarine': 3, 
    'Patrol Boat': 2
};

class Game {
    constructor(name1, name2, setMoveMade, setGameOver) {
        this.checkMove = this.checkMove.bind(this);
        this.playRound = this.playRound.bind(this);
        this.placeShipRandom = this.placeShipRandom.bind(this);
        this.checkForGameOver = this.checkForGameOver.bind(this);
        this.players = {
            1: new Player(name1, 1 ,this.checkMove),
            2: new Player(name2, 2 ,this.checkMove)
        };
        this.currentPlayer = 1;
        this.gameOver = false;
        this.ships = ships;
        this.placeShipRandom(1);
        this.placeShipRandom(2);
        this.setMoveMade = setMoveMade;
        this.setGameOver = setGameOver;
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
            this.setGameOver(true);
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
            if (this.players[this.currentPlayer].name === 'computer') {
                const randomCoordinates = computerMove();
                this.playRound(this.currentPlayer, randomCoordinates);
            }
            this.setMoveMade(true);
        }
    }

    startGame() {
        //Trzeba sprawdzić czy zawodnicy ustalawili wszystkie statk. 
        //Jeśli jeden z zawodników to komputer to trzeba losowo ustawić statki. 
        
    }

    placeShipRandom(playerNr) {
        let playerBoard = this.players[playerNr].gameBoard;
        for (let shipName in this.ships) {
            const shipsLength = this.ships[shipName];
            let shipPlaced;
            while (!shipPlaced) {
                let coordinates = computerMove(); 
                let position = randomPosition();
                shipPlaced = playerBoard.placeShip(shipName, shipsLength, coordinates, position);
            }
        }
    }
}

export default Game;