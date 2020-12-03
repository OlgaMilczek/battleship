import React, {useState} from 'react'; 

import {gameStates, fieldTypes, possiblePositions} from '../Helpers/constants';


function PlayerBoard(props) {
    const [selectedShip, setSelectedShip] = useState('');
    const [correctFields, setCorrectFields]  = useState([]);

    const playerBoard = props.player.gameBoard.board;
    const playerShips = props.player.gameBoard.ships;
    let content;

    const rotateShip = (shipName) => {
        const coordinates = playerShips[shipName].coordinates;
        const oldPosition = playerShips[shipName].position;
        let newPosition; 
        if (oldPosition === possiblePositions.VERTICAL) {
            newPosition = possiblePositions.HORIZONTAL;
        } else {
            newPosition = possiblePositions.VERTICAL;
        }
        props.player.moveShip(shipName, coordinates, newPosition);
        setSelectedShip('');
        setCorrectFields([]);
    };

    const selectShip = (shipName) => {
        setSelectedShip(shipName);
        if (shipName === selectedShip) {
            rotateShip(shipName);
        }
    };

    const moveShip = (coordinates) => {
        if (selectedShip === '') {
            setSelectedShip('');
            return;
        }
        const position = playerShips[selectedShip].position;
        props.player.moveShip(selectedShip, coordinates, position);
        props.shipMoved(true);
        setSelectedShip('');
        setCorrectFields([]);
    };

    const checkFiledPlacement = (coordinates) => {
        if (selectedShip === '') {
            setSelectedShip('');
            return;
        }
        setCorrectFields([]);
        const shipLength = playerShips[selectedShip].length;
        const position = playerShips[selectedShip].position;
        const nextField =  props.player.gameBoard.checkNextCoordinates(position);
        const canBePlaced = props.player.gameBoard.checkShipPlacement(selectedShip, shipLength, coordinates, nextField);
        if (canBePlaced) {
            setCorrectFields(prevCorrect => [...prevCorrect, coordinates]);
            correctFields.push(coordinates);
            let [nextX, nextY] = nextField;
            let [x, y] = coordinates;
            for (let i = 0; i < shipLength; i++) {
                setCorrectFields(prevCorrect => [...prevCorrect, [x+nextX*i, y+nextY*i]]);
            }
        }
    };

    if (props.shipsMoved) {
        setSelectedShip('');
        setCorrectFields([]);
    }

    if (props.gameStatus === gameStates.SHIP_PLACEMENT) {
        content = playerBoard.map((row, i) => {
            return row.map((field, j) => {
                let className = fieldTypes.FIELD;
                if (field !== null) {
                    className = fieldTypes.SHIP;
                    if (field.name === selectedShip) {
                        className = 'selected-ship';
                    }
                    return <div className={className} key={[i,j]} onClick={() => selectShip(field.name)}> </div>;
                }
                for (let k=0; k < correctFields.length; k++) {
                    const [x, y] = correctFields[k];
                    if (x === i && y === j) {
                        className = 'correct';
                    }
                }
                return <div 
                    className={className} 
                    key={[i,j]} 
                    onClick={() => moveShip([i,j])} 
                    onMouseOver={() => checkFiledPlacement([i,j])}> 
                </div>;
            });
        });
    } else {
        content = playerBoard.map((row, i) => {
            return row.map((field, j) => {
                let className = fieldTypes.EMPTY;
                if (field !== null) {
                    if (field === fieldTypes.MISS) {
                        className = fieldTypes.MISS;
                    } else {
                        if (field.hit) {
                            if (playerShips[field.name].sunk) {
                                className = fieldTypes.SUNK;
                            } else {
                                className = fieldTypes.HIT;
                            }
                        } else {
                            className = fieldTypes.SHIP;
                        }
                    }
                    return <div className={className} key={[i,j]}> </div>;
                }
                return <div className={className} key={[i,j]}> </div>;
            });
        });
    }
    
    return (
        <div className ='playerBoard'>
            {content}
        </div>
    );
}

export default PlayerBoard;