import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    function handleClick(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            // create a new object since the reference of the old object will be used which will give inconsistency
            const updatedBoard = [...prevGameBoard.map((innerArray)=> [...innerArray])]
        
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
        
            return updatedBoard;
        });
        
        onSelectSquare();
    }

    return (
        <ol id = "game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={()=>handleClick(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}