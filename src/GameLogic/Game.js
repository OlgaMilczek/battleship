import Player from './Player';
import computerMove from './computerMoves';

const ships = {
    'Carrier': 5, 
    'Battleship': 4, 
    'Destroyer': 3, 
    'Submarine': 3, 
    'Patrol Boat': 2
};

class Game {
    constructor(name1, name2) {
        this.players = {
            1: new Player(name1, this.checkMove),
            2: new Player(name2, this.checkMove)
        };
        this.currentPlayer = 1;
        this.gameOver = false;
        this.gameStart = false;
        this.ships = ships;
    }

    checkMove(coordinates) {
        let opponent;
        if (this.currentPlayer === 1) {
            opponent = this.players[2];
        } else if (this.currentPlayer === 2){
            opponent = this.players[1];
        }    
        else {
            throw new Error ('Something is wrong! There should be only two players');
        }
        const [opponentHit, opponentSunk] = opponent.boardGame.receiveAttack(coordinates);
        return [opponentHit, opponentSunk];
    }

    checkForGameOver() {
        const opponentNr = (this.currentPlayer === 1 ? 2 : 1);
        const opponentBoard = this.players[opponentNr].gameBoard;
        const shipsLength = Object.keys(opponentBoard.ships).length;
        if (opponentBoard.sunkShip === shipsLength) {
            this.gameOver = true;
        }
    }

    playRound(player, coordinates) {
        const currentPlayer = this.players[this.currentPlayer];
        if (player.name !== currentPlayer.name) {
            return;
        }
        const moveMade = currentPlayer.makeMove(coordinates);
        if(moveMade) {
            this.currentPlayer === 1 ? this.currentPlayer=2 : this.currentPlayer=1;
        }
        if (this.players[this.currentPlayer].name === 'computer') {
            const randomCoordinates = computerMove();
            this.playRound(this.players[this.currentPlayer], randomCoordinates);
        }
    }

}

export default Game;