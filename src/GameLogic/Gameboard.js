import Ship from './Ship';
import createBoard from './createBoard';

class GameBoard {
    constructor() {
        this.board = createBoard();
        this.adjacentFields = this.createAdjacentFields(); 
        this.ships = {};
        this.gameOver = false;
        this.sunkShip = 0;
    }

    createAdjacentFields() {
        let allFields = []; 
        let coordinatesXY = [-1, 0, 1];
        for (let x = 0; x < coordinatesXY.length; x++) {
            for (let y = 0; y < coordinatesXY.length; y++) {
                let coordinate = [coordinatesXY[x], coordinatesXY[y]];
                allFields.push(coordinate);
            }
        }
        return allFields;
    }

    checkFiledExist(coordinates) {
        const [x, y] = coordinates;
        if (x < 0 || x >= this.board[0].length) {
            return false;
        } else if (y < 0 || y >= this.board.length) {
            return false;
        } else {
            return true;
        }
    }

    checkField(coordinates) {
        const [x, y] = coordinates;
        if (this.board[x][y] === null) {
            return true;
        } else {
            return false;
        }
    }

    checkShipPlacement(shipLength, coordinates, nextField) {
        const [nextX, nextY] = nextField;
        const [x, y] = coordinates;
        for (let i = 0; i < shipLength; i++) {
            //checks that fields are available.
            for (let nextCoord of this.adjacentFields) {
                const [deltaX, deltaY] = nextCoord;
                const currentX = x + (i * nextX) + deltaX;
                const currentY = y + (i * nextY) + deltaY;
                const filedExist = this.checkFiledExist([currentX, currentY]);
                if (filedExist) {
                    const fieldChecked = this.checkField([currentX, currentY]);
                    if (!fieldChecked) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    placeShip(shipName, shipLength, coordinates, position) {
        /*This function should take Ship component, 
        coordinates of the first element of ship, 
        and position (vertical or horizontal) as a arguments. 
        It's checks that the ship can be placed, 
        and if it can place the ship. */
        let nextField;
        const [x, y] = coordinates;
        if (position === 'horizontal') {
            nextField = [1,0];
        } else if (position === 'vertical') {
            nextField = [0,1];
        } else {
            throw new Error('Wrong position!');
        }
        const shipCanBePlaced = this.checkShipPlacement(shipLength, coordinates, nextField);
        if (shipCanBePlaced) {
            for (let i = 0; i < shipLength; i++) {
                const [nextX, nextY] = nextField;
                const currentX = x + (i * nextX);
                const currentY = y + (i * nextY);
                this.board[currentX][currentY] = [shipName, i];
                const placedShip = new Ship(shipName, shipLength);
                this.ships = {...this.ships, 
                    [shipName]: placedShip
                };
            }
        }
    }

    checkForGameOver() {
        if (Object.keys(this.ships).length === this.sunkShip) {
            return this.gameOver = true;
        }
        return this.gameOver = false;
    }

    receiveAttack(coordinates) {
        let isHit = false; 
        let isSunk = false;
        if (!this.gameOver) {
            const [x, y] = coordinates;
            if (this.board[x][y] === null) {
                this.board[x][y] = 'miss';
            } else {
                const [shipName, hitPlace] = this.board[x][y];
                this.board[x][y] = [shipName, 'hit'];
                const hitShip = this.ships[shipName];
                hitShip.hit(hitPlace);
                isHit = true;
                if (hitShip.sunk) {
                    isSunk = true;
                    this.sunkShip += 1;
                    this.checkForGameOver();
                }
            }
            return [isHit, isSunk];
        }
    }
}


export default GameBoard;