import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}) {

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    function handleClick() {
        // setIsEditing(!isEditing); // schedule a state update. Not updating instantly 
        setIsEditing(editing => !editing); // checks for the previous value of isEditing and updates instantly. Good Practice
        if(isEditing)
            onNameChange(symbol, name);
    }

    function handleChange(event) {
        setName(event.target.value);
    }   

    let nameContent = <span className="player-name">{name}</span>;
    if (isEditing)
        nameContent = <input type='text' required value={name} onChange={ handleChange }/>

    return (
        <li className={isActive ? 'active' : undefined} >
            <span className="player">
              { nameContent }
              <span className="player-symbol">{symbol}</span>
              <button onClick={()=>handleClick()}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}