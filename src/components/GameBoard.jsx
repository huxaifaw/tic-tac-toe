// import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectSquare, turns}) {

    let gameBoard = initialGameBoard;

    for (let turn of turns) {
        let {square, player} = turn;
        let {row, col} = square;

        gameBoard[row][col] = player;
    }

    return (
        <ol id = "game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}