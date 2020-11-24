import createBoard from './createBoard';

test('Create proper board', () => {
    const newBoard = createBoard();
    expect(newBoard.length).toBe(10);
    for (let row of newBoard) {
        expect(row.length).toBe(10);
        for (let field of row) {
            expect(field).toBe(null);
        }
    }
});
