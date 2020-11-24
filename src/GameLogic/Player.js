import GameBoard from './Gameboard';

import createBoard from './createBoard';

class Player {
    constructor(name, nr ,checkMove) {
        this.name = name;
        this.opponentBoard = createBoard();
        this.gameBoard = new GameBoard();
        this.checkMove = checkMove;
        this.number = nr;
    } 

    makeShipSunk(x, y) {
        const possiblePosition = [[0,1], [0, -1], [1, 0], [-1, 0]];
        for (let i= 0; i< possiblePosition.length; i++) {
            let [deltaX, deltaY] = possiblePosition[i];
            let nextX = x + deltaX;
            let nextY = y + deltaY;
            const filedExist = this.gameBoard.checkFiledExist([nextX, nextY]);
            if(filedExist) {
                while (this.opponentBoard[nextX][nextY] === 'hit') {
                    this.opponentBoard[nextX][nextY] = 'sunk';
                    nextX += deltaX;
                    nextY += deltaY;
                }
            }
        }
    }

    makeMove(coordinates) {
        const [x, y] = coordinates; 
        if (this.opponentBoard[x][y] === null) {
            const [opponentHit, opponentSunk] = this.checkMove(coordinates, this.number);
            if (opponentHit && !opponentSunk) {
                this.opponentBoard[x][y] = 'hit';
            }
            else if (opponentHit  && opponentSunk) {
                this.opponentBoard[x][y] = 'sunk';
                this.makeShipSunk(x, y);
            } else {
                this.opponentBoard[x][y] = 'miss';
            }
            return true;
        }
        return false;
    }

    moveShip(shipName, OldCoordinates, OldPosition, NewCoordinates, NewPosition) {
        const removedShip = this.gameBoard.removeShip(shipName, OldCoordinates, OldPosition);
        const shipLength = removedShip.shipName;
        const canShipBeMoved = this.gameBoard.placeShip(shipName, shipLength,  NewCoordinates, NewPosition);
        if (!canShipBeMoved) {
            this.gameBoard.placeShip(shipName, shipLength,  OldCoordinates, OldPosition);
        }
    }
}

export default Player;