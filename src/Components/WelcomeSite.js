import React, {useState} from 'react';

const WelcomeSite = (props) => {
    const [name, setName] = useState(props);

    const onSubmit = (e) => {
        e.preventDefault();
        props.setPlayerName(name);
    };

    return (
        <div class='o-welcome'>
            <h1 class='o-welcome-title' >Battleships</h1>
            <form class = 'm-form' onSubmit={onSubmit}>
                <label>Input your name:</label>
                <input type='text' onChange={(e) => {setName(e.target.value)}} value={name}/>
                <button class = 'button' >Let's play</button>
            </form>
        </div>
    );
};

export default WelcomeSite;