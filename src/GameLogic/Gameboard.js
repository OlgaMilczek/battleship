import Ship from './Ship';

class GameBoard {
    constructor(size) {
        this.board = this.createBoard(size);
        this.adjacentFields = this.createAdjacentFields(); 
        this.ships = {};
        this.sunkShip = 0;
    }

    createBoard(size) {
        let board = [];
        for (let i = 0; i < size; i ++) {
            const row = [];
            for (let j = 0; j < size; j ++) {
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
        } else if (y < 0 || y >=  this.board.length) {
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
    
    checkNextCoordinates(position) {
        let nextField;
        if (position === 'horizontal') {
            nextField = [1,0];
        } else if (position === 'vertical') {
            nextField = [0,1];
        } else {
            throw new Error('Wrong position!');
        }
        return nextField;
    }

    checkShipPlacement(shipName, shipLength, coordinates, nextField) {
        const [nextX, nextY] = nextField;
        const [x, y] = coordinates;
        for (let i = 0; i < shipLength; i++) {
            //checks that fields are available.
            for (let nextCoord of this.adjacentFields) {
                const [deltaX, deltaY] = nextCoord;
                const currentX = x + (i * nextX) + deltaX;
                const currentY = y + (i * nextY) + deltaY;
                const filedExist = this.checkFiledExist([currentX, currentY], this.board);
                if (filedExist) {
                    const fieldChecked = this.checkField([currentX, currentY], this.board);
                    if (!fieldChecked && this.board[currentX][currentY].name !== shipName) {
                        return false;
                    }
                } else {
                    if (deltaX === 0 && deltaY===0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placeShip(shipName, shipLength, coordinates, position) {
        /*This function should take Ship component, 
        coordinates of the first element of ship, 
        and position (vertical or horizontal) as a arguments. 
        It's checks that the ship can be placed, 
        and if it can place the ship. */
        const nextField = this.checkNextCoordinates(position);
        const [x, y] = coordinates;
        const shipCanBePlaced = this.checkShipPlacement(shipName, shipLength, coordinates, nextField);
        if (shipCanBePlaced) {
            for (let i = 0; i < shipLength; i++) {
                const [nextX, nextY] = nextField;
                const currentX = x + (i * nextX);
                const currentY = y + (i * nextY);
                this.board[currentX][currentY] = {
                    name: shipName,
                    place: i,
                    hit: false
                };
            }
            const placedShip = new Ship(shipLength, position, coordinates);
            this.ships = {...this.ships, 
                [shipName]: placedShip
            };
            return true;
        }
        return false;
    }

    removeShip(shipName) {
        const position = this.ships[shipName].position;
        const [x, y] = this.ships[shipName].coordinates;
        const shipLength = this.ships[shipName].length;
        const nextField = this.checkNextCoordinates(position);
        for (let i = 0; i < shipLength; i++) {
            const [nextX, nextY] = nextField;
            const currentX = x + (i * nextX);
            const currentY = y + (i * nextY);
            this.board[currentX][currentY] = null;
            delete this.ships[shipName];
        }
    }

    receiveAttack(coordinates) {
        let isHit = false; 
        let isSunk = false;
        const [x, y] = coordinates;
        if (this.board[x][y] === null) {
            this.board[x][y] = 'miss';
        } else {
            const ship = this.board[x][y];
            ship.hit = true;
            const hitShip = this.ships[ship.name];
            hitShip.hit(ship.place);
            isHit = true;
            if (hitShip.sunk) {
                isSunk = true;
                this.sunkShip += 1;
            }
        }
        return [isHit, isSunk];
    }
}


export default GameBoard;