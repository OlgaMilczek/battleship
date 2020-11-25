import Ship from './Ship';

test('Is create Ship properly', () => {
    const Submarine = new Ship(3, 'horizontal', [1, 1]);
    const Destroyer = new Ship(3, 'vertical', [2,2]);
    const Carrier = new Ship(5, 'vertical', [2,2]);
    expect(Submarine.hits.length).toBe(3);
    expect(Destroyer.hits.length).toBe(3);
    expect(Carrier.hits.length).toBe(5);
});

test('Gets hit properly', () => {
    const Submarine = new Ship(3, 'vertical', [2,2]);
    Submarine.hit(2);
    Submarine.hit(0);
    Submarine.hit(2);
    expect(Submarine.hits).toStrictEqual(['hit', null, 'hit']);
    const Carrier = new Ship(5, 'vertical', [2,5]);
    Carrier.hit(0);
    Carrier.hit(1);
    Carrier.hit(2);
    expect(Carrier.hits).toStrictEqual(['hit','hit', 'hit', null, null]);
});

test('Its sunk properly', () => {
    const Submarine = new Ship(3, 'vertical', [2,2]);
    Submarine.hit(2);
    Submarine.hit(0);
    Submarine.hit(1);
    expect(Submarine.sunk).toBe(true);
    const Carrier = new Ship(5, 'vertical', [2,2]);
    Carrier.hit(0);
    Carrier.hit(1);
    Carrier.hit(2);
    expect(Carrier.sunk).toStrictEqual(false);
});

