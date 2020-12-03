import React from 'react'; 

import {fieldTypes} from '../Helpers/constants';

function PlayerBoard(props) {
    const playerBoard = props.player.gameBoard.board;
    const playerShips = props.player.gameBoard.ships;

    const content = playerBoard.map((row, i) => {
        return row.map((field, j) => {
            let className = fieldTypes.EMPTY;
            if (field !== null) {
                if (field === fieldTypes.MISS) {
                    className = fieldTypes.MISS;
                } else {
                    let isHit = field.hit;
                    if (isHit) {
                        if (playerShips[field.name].sunk) {
                            className = fieldTypes.SUNK;
                        } else {
                            className = fieldTypes.HIT;
                        }
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