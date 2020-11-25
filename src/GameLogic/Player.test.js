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
    'Carrier': 5, 
    'Battleship': 4, 
    'Destroyer': 3, 
    'Submarine': 3, 
    'Patrol Boat': 2
};

test('Mark miss properly', () => {
    const newPlayer = new Player(1, false, alwaysMiss, 10);
    newPlayer.makeMove([3,5]);
    newPlayer.makeMove([3,7]);
    expect(newPlayer.opponentBoard[3][5]).toBe('miss');
    expect(newPlayer.opponentBoard[3][7]).toBe('miss');
    expect(newPlayer.opponentBoard[4][8]).toBe(null);
});

test('Make opponent ship hit properly', () => {
    const newPlayer = new Player(1, false, alwaysHit, 10);
    newPlayer.makeMove([0,5]);
    newPlayer.makeMove([3,7]);
    expect(newPlayer.opponentBoard[0][5]).toBe('hit');
    expect(newPlayer.opponentBoard[3][7]).toBe('hit');
    expect(newPlayer.opponentBoard[3][8]).toBe(null);
});


test('Make ship sunk properly', () => {
    const newPlayer = new Player(1, true, alwaysSunk, 10);
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
    const newPlayer = new Player(1, false, alwaysMiss, 10);
    newPlayer.gameBoard.placeShip('Submarine',3 , [0,2], 'horizontal');
    newPlayer.moveShip('Submarine' , [3,4], 'vertical');
    expect(newPlayer.gameBoard.board[0][2]).toBe(null);
    expect(newPlayer.gameBoard.board[1][2]).toBe(null);
    expect(newPlayer.gameBoard.board[2][2]).toBe(null);
    expect(newPlayer.gameBoard.board[3][4]).toStrictEqual(['Submarine', 0]);
    expect(newPlayer.gameBoard.board[3][5]).toStrictEqual(['Submarine', 1]);
    expect(newPlayer.gameBoard.board[3][6]).toStrictEqual(['Submarine', 2]);
});

test('Ships stays tha same place when it cannot be moved', () => {
    const newPlayer = new Player(1, false, alwaysMiss, 10);
    newPlayer.gameBoard.placeShip('Submarine',3 , [0,2], 'horizontal');
    newPlayer.gameBoard.placeShip('Patrol boat',2 , [3,4], 'horizontal');
    newPlayer.moveShip('Submarine', [3,4], 'vertical');
    expect(newPlayer.gameBoard.board[0][2]).toStrictEqual(['Submarine', 0]);
    expect(newPlayer.gameBoard.board[1][2]).toStrictEqual(['Submarine', 1]);
    expect(newPlayer.gameBoard.board[2][2]).toStrictEqual(['Submarine', 2]);
    expect(newPlayer.gameBoard.board[3][4]).toStrictEqual(['Patrol boat', 0]);
    expect(newPlayer.gameBoard.board[3][5]).toBe(null);
    expect(newPlayer.gameBoard.board[3][6]).toBe(null);
});

test('Random ships placment work corectly', () => {
    const size = 10;
    const shipsLength = Object.keys(ships).length;
    //Set first player and place ship randomly.
    const newPlayer1 = new Player(1, false, alwaysMiss, size);
    newPlayer1.placeShipRandom(size, ships);
    const placedShipsLength1 =  Object.keys(newPlayer1.gameBoard.ships).length;
    //Set second player and place ship randomly.
    const newPlayer2 = new Player(2, false, alwaysMiss, size);
    newPlayer2.placeShipRandom(size, ships);
    const placedShipsLength2 =  Object.keys(newPlayer2.gameBoard.ships).length;

    expect(newPlayer2.gameBoard).not.toStrictEqual(newPlayer1.gameBoard);
    expect(placedShipsLength1).toBe(shipsLength);
    expect(placedShipsLength2).toBe(shipsLength);
});

test('Can rarange board with random placement', () => {
    const size = 10;
    const shipsLength = Object.keys(ships).length;
    //Set first player and place ship randomly.
    const newPlayer = new Player(1, false, alwaysMiss, size);
    newPlayer.placeShipRandom(size, ships);
    //Save old board to variable.
    const oldBoard = {...newPlayer.gameBoard};
    //Rearrange ships.
    newPlayer.placeShipRandom(size, ships);
    const placedShipsLength =  Object.keys(newPlayer.gameBoard.ships).length;
    expect(newPlayer.gameBoard).not.toStrictEqual(oldBoard);
    expect(placedShipsLength).toBe(shipsLength);
});