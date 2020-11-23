const SIZE = 10;

function createBoard() {
    let board = [];
    for (let i = 0; i < SIZE; i ++) {
        const row = [];
        for (let j = 0; j < SIZE; j ++) {
            row.push(null);
        }
        board.push(row);
    }
    return board;
}

export default createBoard;
