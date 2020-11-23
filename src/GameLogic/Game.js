import Player from './Player';

class Game {
    constructor(name1, name2) {
        this.players = {
            1: new Player(name1, this.checkMove),
            2: new Player(name2, this.checkMove)
        };
        this.currentPlayer = 1;
        this.gameOver = false;
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
        const [opponentHit, opponentSunk] = opponent.board.receiveAttack(coordinates);
        return [opponentHit, opponentSunk];
    }

}

export default Game;