const possiblePositions = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

class Ship {
    constructor(length, position, coordinates) {
        this.length = length; 
        this.sunk = false; 
        this.hits = this.createListOfHits();
        this.position = position;
        this.coordinates = coordinates;
    }

    createListOfHits() {
        let listOfHits = [];
        for (let i = 0; i < this.length; i++) {
            listOfHits.push(null);
        }
        return listOfHits; 
    }

    hit(position) {
        if (this.hits[position] === 'hit') {
            return;
        }
        this.hits[position] = 'hit';
        this.isSunk();
    }

    isSunk() {
        for (let square of this.hits) {
            if (square === null) {
                return this.sunk = false;
            }
        }
        return this.sunk = true;
    }

    changeLocation(newPosition, newCoordinates) {
        if (newPosition !== possiblePositions.VERTICAL || newPosition !== possiblePositions.HORIZONTAL) {
            throw new Error ('Somthing went wrong! Wrong ship position');
        }
        this.position = newPosition;
        this.coordinates = newCoordinates;
    }
}

export default Ship;