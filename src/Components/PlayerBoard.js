import React from 'react'; 

const fieldTypes = {
    EMPTY: 'field',
    HIT: 'hit', 
    SUNK: 'sunk',
    MISS: 'miss',
    SHIP: 'ship'
};

function PlayerBoard(props) {
    const playerBoard = props.player.gameBoard.board;
    const content = playerBoard.map((row, i) => {
        return row.map((field, j) => {
            let className = fieldTypes.EMPTY;
            if (field !== null) {
                if (field === fieldTypes.MISS) {
                    className = fieldTypes.MISS;
                } else {
                    let isHit = field.hit;
                    if (isHit) {
                        className = fieldTypes.HIT;
                    } else {
                        className = fieldTypes.SHIP;
                    }
                }
            }
            return <div className={className} key={[i,j]} > </div>;
        });
    });
    
    return (
        <div className ='playerBoard'>
            {content}
        </div>
    );
}

export default PlayerBoard;