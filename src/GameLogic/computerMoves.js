function randomMove() {
    return Math.floor(Math.random() * 10);
}

function computerMove() {
    const x = randomMove();
    const y = randomMove();
    return [ x, y ];
}

export default computerMove;