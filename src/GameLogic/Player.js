import GameBoard from './Gameboard';

import {computerMove, randomPosition} from './computerMoves';

class Player {
    constructor(nr, isComputer ,checkMove, size) {
        this.gameBoard = new GameBoard(size);
        this.opponentBoard = this.gameBoard.createBoard(size);
        this.checkMove = checkMove;
        this.number = nr;
        this.isComputer = isComputer;
        this.makeMove = this.makeMove.bind(this);
        this.placeShipRandom = this.placeShipRandom.bind(this);
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

    moveShip(shipName, NewCoordinates, NewPosition) {
        const OldCoordinates = this.gameBoard.ships[shipName].coordinates;
        const OldPosition = this.gameBoard.ships[shipName].position;
        const shipLength = this.gameBoard.ships[shipName].length;
        this.gameBoard.removeShip(shipName, OldCoordinates, OldPosition);
        const canShipBeMoved = this.gameBoard.placeShip(shipName, shipLength,  NewCoordinates, NewPosition);
        if (!canShipBeMoved) {
            this.gameBoard.placeShip(shipName, shipLength,  OldCoordinates, OldPosition);
        }
    }


    placeShipRandom(size, ships) {
        let newBoard = new GameBoard(size);
        for (let shipName in ships) {
            const shipsLength = ships[shipName];
            let shipPlaced;
            while (!shipPlaced) {
                let coordinates = computerMove(); 
                let position = randomPosition();
                shipPlaced = newBoard.placeShip(shipName, shipsLength, coordinates, position);
            }
        }
        this.gameBoard = newBoard;
    }
}

export default Player;