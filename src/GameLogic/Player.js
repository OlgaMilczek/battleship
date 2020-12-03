import GameBoard from './Gameboard';

import {computerMove, randomPosition} from './computerMoves';

import {fieldTypes} from '../Helpers/constants';

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
            let filedExist = this.gameBoard.checkFiledExist([nextX, nextY]);
            if(filedExist) {
                while (filedExist && this.opponentBoard[nextX][nextY] === fieldTypes.HIT) {
                    this.opponentBoard[nextX][nextY] = fieldTypes.SUNK;
                    nextX += deltaX;
                    nextY += deltaY;
                    filedExist = this.gameBoard.checkFiledExist([nextX, nextY]);
                }
            }
        }
    }

    makeMove(coordinates) {
        const [x, y] = coordinates; 
        if (this.opponentBoard[x][y] === null) {
            const [opponentHit, opponentSunk] = this.checkMove(coordinates, this.number);
            if (opponentHit && !opponentSunk) {
                this.opponentBoard[x][y] = fieldTypes.HIT;
            }
            else if (opponentHit  && opponentSunk) {
                this.opponentBoard[x][y] = fieldTypes.SUNK;
                this.makeShipSunk(x, y);
            } else {
                this.opponentBoard[x][y] = fieldTypes.MISS;
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