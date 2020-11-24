import React from 'react'; 

function PlayerBoard(props) {
    const playerBoard = props.player.gameBoard.board;
    const content = playerBoard.map((row, i) => {
        return row.map((field, j) => {
            let className = 'field';
            if (field !== null) {
                if (field === 'miss') {
                    className = 'miss';
                } else {
                    let place = field[1];
                    if (place === 'hit') {
                        className = 'hit';
                    } else {
                        className = 'ship';
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