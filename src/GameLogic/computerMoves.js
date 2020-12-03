import {possiblePositions} from '../Helpers/constants';

function randomInt(num) {
    return Math.floor(Math.random() * num);
}

function computerMove() {
    const x = randomInt(10);
    const y = randomInt(10);
    return [ x, y ];
}

function randomPosition() {
    let positions = [possiblePositions.VERTICAL, possiblePositions.HORIZONTAL];
    return positions[randomInt(2)];
}

export  {computerMove, randomPosition};