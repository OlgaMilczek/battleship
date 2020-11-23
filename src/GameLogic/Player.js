import GameBoard from './Gameboard';

import createBoard from './createBoard';

class Player {
    constructor(name, checkMove) {
        this.name = name;
        this.opponentBoard = createBoard();
        this.Board = new GameBoard();
        this.checkMove = checkMove;
    } 

    makeShipSunk(x, y) {
        const possiblePosition = [[0,1], [0, -1], [1, 0], [-1, 0]];
        for (let i= 0; i< possiblePosition.length; i++) {
            let [deltaX, deltaY] = possiblePosition[i];
            let nextX = x + deltaX;
            let nextY = y + deltaY;
            while (this.opponentBoard[nextX][nextY] === 'hit') {
                this.opponentBoard[nextX][nextY] = 'sunk';
                nextX += deltaX;
                nextY += deltaY;
            }
        }
    }

    makeMove(coordinates) {
        const [x, y] = coordinates; 
        if (this.opponentBoard[x][y] === null) {
            const [opponentHit, opponentSunk] = this.checkMove(coordinates);
            if (opponentHit) {
                this.opponentBoard[x][y] = 'hit';
            }
            else if (opponentSunk) {
                this.opponentBoard[x][y] = 'sunk';
                this.makeShipSunk(x, y);
            }
            return true;
        }
        return false;
    }
}

export default Player;