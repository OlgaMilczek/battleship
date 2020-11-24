import React, {useState} from 'react';

const WelcomeSite = (props) => {
    const [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        props.setPlayerName(name);
    };

    return (
        <div className='o-welcome'>
            <h1 className='title' >Battleships</h1>
            <form className = 'm-form' onSubmit={onSubmit}>
                <label>Input your name:</label>
                <input type='text' className = 'eightbit' onChange={(e) => setName(e.target.value)} value={name}/>
                <button className ='eightbit eightbit-btn' >Let's play</button>
            </form>
        </div>
    );
};

export default WelcomeSite;