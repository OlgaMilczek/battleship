class Ship {
    constructor(name, length) {
        this.name = name; 
        this.length = length; 
        this.sunk = false; 
        this.hits = this.createListOfHits();
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
}

export default Ship;