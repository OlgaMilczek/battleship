import React from 'react'; 

function OpponentBoard(props) {
    const playerBoard = props.player.opponentBoard;

    let onClick = (e) => {
        const coordinates = e.target.getAttribute('data').split(',');
        let [x, y] =  coordinates;
        x = Number(x);
        y = Number(y);
        props.playRound(1, [x,y]);
    };

    const content = playerBoard.map((row, i) => {
        return row.map((field, j) => {
            let className = 'field';
            if (field !== null) {
                className = field;
                return <div className={className} key={[i,j]}>  </div>;
            }
            return <div className={`${className} enemy`} key={[i,j]} data={[i,j]} onClick = {onClick} />;
        });
    });
    
    return (
        <div className ='playerBoard'>
            {content}
        </div>
    );
}

export default OpponentBoard;