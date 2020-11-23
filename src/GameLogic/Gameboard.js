import Ship from './Ship'

class GameBoard {
    constructor(props) {
        this.board = this.createBoard();
        this.allShipsSunk = false;
        this.adjacentFields = this.createAdjacentFields(); 
        this.Carrier = new Ship('carrier', 5);
        this.ships = {
            'Battleship': new Ship('Battleship', 4),
            'Destroyer': new Ship('Destroyer', 3),
            'Submarine': new Ship('Submarine', 3),
            'Patrol Boat': new Ship('Patrol Boat', 2)
        };
        this.gameOver = false;
    }

    createBoard() {
        let board = [];
        for (let i = 0; i < 10; i ++) {
            const row = [];
            for (let j = 0; j < 10; j ++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
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
                if (this.checkFiledExist([currentX, currentY])) {
                    if (!this.checkField) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    placeShip(ship, coordinates, position) {
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
        if (this.checkShipPlacement(ship.length, coordinates, nextField)) {
            for (let i = 0; i < ship.length; i++) {
                const [nextX, nextY] = nextField;
                const currentX = x + (i * nextX);
                const currentY = y + (i * nextY);
                this.board[currentX][currentY] = [ship.name, i];
            }
        }
    }

    checkForGameOver() {
        for (let ship in this.ships) {
            if (this.ships[ship].sunk === false) {
                return false;
            }
        }
        return true;
    }

    receiveAttack(coordinates) {
        const [x, y] = coordinates;
        if (this.board[x][y] === null) {
            this.board[x][y] = 'miss';
        } else {
            const [shipName, hitPlace] = this.board[x][y];
            const hitShip = this.ship[shipName];
            hitShip.hit(hitPlace);
            this.checkForGameOver();
        }
    }
}


export default GameBoard;