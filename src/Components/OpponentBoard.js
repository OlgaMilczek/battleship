import React from 'react'; 

import {gameStates} from '../Helpers/constants';

function OpponentBoard(props) {
    const playerBoard = props.player.opponentBoard;
    let enemyClass = 'enemy';

    let onClick = (e) => {
        const coordinates = e.target.getAttribute('data').split(',');
        let [x, y] =  coordinates;
        x = Number(x);
        y = Number(y);
        props.playRound(1, [x,y]);
    };

    if (props.gameStatus === gameStates.SHIP_PLACEMENT) {
        onClick = null;
        enemyClass = '';
    }

    const content = playerBoard.map((row, i) => {
        return row.map((field, j) => {
            let className = 'field';
            if (field !== null) {
                className = field;
                return <div className={className} key={[i,j]}>  </div>;
            }
            return <div className={`${className} ${enemyClass}`} key={[i,j]} data={[i,j]} onClick = {onClick} />;
        });
    });
    
    return (
        <div className ='playerBoard'>
            {content}
        </div>
    );
}

export default OpponentBoard;