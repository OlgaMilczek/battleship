function randomMove(num) {
    return Math.floor(Math.random() * num);
}

function computerMove() {
    const x = randomMove(10);
    const y = randomMove(10);
    return [ x, y ];
}

function randomPosition() {
    let positions = ['vertical', 'horizontal'];
    return positions[randomMove(2)];
}

export  {computerMove, randomPosition};