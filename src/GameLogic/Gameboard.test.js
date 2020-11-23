import GameBoard from './Gameboard';

test('Create proper board', () => {
    const newGame = new GameBoard();
    expect(newGame.board.length).toBe(10);
    const row = newGame.board[0];
    expect(row.length).toBe(10);
});

test('Placed ship properly', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5 , [3 , 4], 'horizontal');
    newGame.placeShip('Patrol Boat', 2 , [1 , 5], 'vertical');
    expect(newGame.board[3][4]).toStrictEqual(['Carrier', 0]);
    expect(newGame.board[4][4]).toStrictEqual(['Carrier', 1]);
    expect(newGame.board[5][4]).toStrictEqual(['Carrier', 2]);
    expect(newGame.board[6][4]).toStrictEqual(['Carrier', 3]);
    expect(newGame.board[7][4]).toStrictEqual(['Carrier', 4]);
    expect(newGame.board[1][5]).toStrictEqual(['Patrol Boat', 0]);
    expect(newGame.board[1][6]).toStrictEqual(['Patrol Boat', 1]);
});

test('Can placed ship along border', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Patrol Boat', 2 , [9 , 5], 'vertical');
    expect(newGame.board[9][5]).toStrictEqual(['Patrol Boat', 0]);
    expect(newGame.board[9][6]).toStrictEqual(['Patrol Boat', 1]);
});

test('Can\'t place two ships in one place', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5, [3 , 4], 'horizontal');
    newGame.placeShip('Patrol Boat', 2, [4 , 4], 'vertical');
    expect(newGame.board[3][4]).toStrictEqual(['Carrier', 0]);
    expect(newGame.board[4][4]).toStrictEqual(['Carrier', 1]);
    expect(newGame.board[5][4]).toStrictEqual(['Carrier', 2]);
    expect(newGame.board[6][4]).toStrictEqual(['Carrier', 3]);
    expect(newGame.board[7][4]).toStrictEqual(['Carrier', 4]);
});

test('Can\'t place two ships next to each other', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5 , [3 , 4], 'horizontal');
    newGame.placeShip('Patrol Boat', 2 , [3 , 5], 'horizontal');
    expect(newGame.board[3][4]).toStrictEqual(['Carrier', 0]);
    expect(newGame.board[4][4]).toStrictEqual(['Carrier', 1]);
    expect(newGame.board[5][4]).toStrictEqual(['Carrier', 2]);
    expect(newGame.board[6][4]).toStrictEqual(['Carrier', 3]);
    expect(newGame.board[7][4]).toStrictEqual(['Carrier', 4]);
    expect(newGame.board[3][5]).toBe(null);
});

test('Hits field properly', () => {
    const newGame = new GameBoard();
    newGame.receiveAttack([ 0, 0 ]);
    newGame.receiveAttack([ 3, 4 ]);
    newGame.receiveAttack([ 7, 4 ]);

    expect(newGame.board[0][0]).toBe('miss');
    expect(newGame.board[3][4]).toBe('miss');
    expect(newGame.board[7][4]).toBe('miss');
});


test('Hits ship properly', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5 , [3 , 4], 'horizontal');
    newGame.receiveAttack([ 3, 4 ]);
    newGame.receiveAttack([ 7, 4 ]);

    expect(newGame.board[3][4]).toStrictEqual(['Carrier' ,'hit']);
    expect(newGame.board[7][4]).toStrictEqual(['Carrier' ,'hit']);
});

test('Sunk ship properly', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5 , [3 , 4], 'horizontal');
    newGame.receiveAttack([ 0, 0 ]);
    newGame.receiveAttack([ 3, 4 ]);
    newGame.receiveAttack([ 4, 4 ]);
    newGame.receiveAttack([ 5, 4 ]);
    newGame.receiveAttack([ 6, 4 ]);
    newGame.receiveAttack([ 7, 4 ]);

    const hitShip = newGame.ships['Carrier'];
    expect(hitShip.sunk).toStrictEqual(true);
    expect(newGame.sunkShip).toBe(1);
});

test('End game properly', () => {
    const newGame = new GameBoard();
    newGame.placeShip('Carrier', 5 , [3 , 4], 'horizontal');
    newGame.placeShip('Patrol Boat', 2 , [1 , 5], 'vertical');
    newGame.receiveAttack([ 0, 0 ]);
    newGame.receiveAttack([ 3, 4 ]);
    newGame.receiveAttack([ 4, 4 ]);
    newGame.receiveAttack([ 5, 4 ]);
    newGame.receiveAttack([ 6, 4 ]);
    newGame.receiveAttack([ 7, 4 ]);
    newGame.receiveAttack([ 1, 5 ]);
    newGame.receiveAttack([ 1, 6 ]);

    expect(newGame.sunkShip).toBe(2);
    expect(newGame.gameOver).toBe(true);
});


