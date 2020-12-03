const gameStates = {
    PREPARING: 'preparing',
    GAME_OVER: 'game over',
    SHIP_PLACEMENT: 'ship placement',
    GAME_RUNNING: 'game running'
};

const gameModes = {
    ONE_PLAYER: 'one player', 
    TWO_PLAYERS: 'two_players'
};

const possiblePositions = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

const ships = {
    'Carrier': 5, 
    'Battleship': 4, 
    'Destroyer': 3, 
    'Submarine': 3, 
    'Patrol Boat': 2
};

const fieldTypes = {
    SHIP: 'ship',
    EMPTY: 'field',
    HIT: 'hit', 
    SUNK: 'sunk',
    MISS: 'miss'
};

const SIZE = 10;

export {gameModes, gameStates, possiblePositions, ships, SIZE, fieldTypes};
