import Player from './Player';

const alwaysSunk = () => {
    return [true, true];
};

const alwaysHit = () => {
    return [true, false];
};

const alwaysMiss = () => {
    return [false, false];
};

const ships = {
    'Submarine': 3, 
    'Patrol Boat': 2
};

test('Mark miss properly', () => {
    const newPlayer = new Player('player', alwaysMiss, ships);
    newPlayer.makeMove([3,5]);
    newPlayer.makeMove([3,7]);
    expect(newPlayer.opponentBoard[3][5]).toBe('miss');
    expect(newPlayer.opponentBoard[3][7]).toBe('miss');
    expect(newPlayer.opponentBoard[4][8]).toBe(null);
});

test('Make opponent ship hit properly', () => {
    const newPlayer = new Player('player', alwaysHit, ships);
    newPlayer.makeMove([0,5]);
    newPlayer.makeMove([3,7]);
    expect(newPlayer.opponentBoard[0][5]).toBe('hit');
    expect(newPlayer.opponentBoard[3][7]).toBe('hit');
    expect(newPlayer.opponentBoard[3][8]).toBe(null);
});


test('Make ship sunk properly', () => {
    const newPlayer = new Player('player', alwaysSunk, ships);
    newPlayer.opponentBoard[0][2] = 'hit';
    newPlayer.opponentBoard[0][3] = 'hit';
    newPlayer.opponentBoard[0][4] = 'hit';
    newPlayer.makeMove([0,5]);
    expect(newPlayer.opponentBoard[0][5]).toBe('sunk');
    expect(newPlayer.opponentBoard[0][2]).toBe('sunk');
    expect(newPlayer.opponentBoard[0][3]).toBe('sunk');
    expect(newPlayer.opponentBoard[0][4]).toBe('sunk');
    expect(newPlayer.opponentBoard[0][1]).toBe(null);
    expect(newPlayer.opponentBoard[0][6]).toBe(null);
    expect(newPlayer.opponentBoard[1][2]).toBe(null);
});

test('Move ship properly', () => {
    const newPlayer = new Player('player', alwaysMiss, ships);
    newPlayer.gameBoard.placeShip('Submarine',3 , [0,2], 'horizontal');
    newPlayer.moveShip('Submarine', [0,2], 'horizontal' , [3,4], 'vertical');
    expect(newPlayer.gameBoard.board[0][2]).toBe(null);
    expect(newPlayer.gameBoard.board[1][2]).toBe(null);
    expect(newPlayer.gameBoard.board[2][2]).toBe(null);
    expect(newPlayer.gameBoard.board[3][4]).toStrictEqual(['Submarine', 0]);
    expect(newPlayer.gameBoard.board[3][5]).toStrictEqual(['Submarine', 1]);
    expect(newPlayer.gameBoard.board[3][6]).toStrictEqual(['Submarine', 2]);
});

test('Ships stays tha same place when it cannot be moved', () => {
    const newPlayer = new Player('player', alwaysMiss, ships);
    newPlayer.gameBoard.placeShip('Submarine',3 , [0,2], 'horizontal');
    newPlayer.gameBoard.placeShip('Patrol boat',2 , [3,4], 'horizontal');
    newPlayer.moveShip('Submarine', [0,2], 'horizontal' , [3,4], 'vertical');
    expect(newPlayer.gameBoard.board[0][2]).toStrictEqual(['Submarine', 0]);
    expect(newPlayer.gameBoard.board[1][2]).toStrictEqual(['Submarine', 1]);
    expect(newPlayer.gameBoard.board[2][2]).toStrictEqual(['Submarine', 2]);
    expect(newPlayer.gameBoard.board[3][4]).toStrictEqual(['Patrol boat', 0]);
    expect(newPlayer.gameBoard.board[3][5]).toBe(null);
    expect(newPlayer.gameBoard.board[3][6]).toBe(null);
});

