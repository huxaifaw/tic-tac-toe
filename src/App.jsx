import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [players, setPlayers] = useState(
    {
      "X": "Player 1",
      "O": "Player 2"
    }
  );

  // perform deep copy otherwise gameboard will have reference of initialGameBoard and will keep updating it
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (let turn of gameTurns) {
      let {square, player} = turn;
      let {row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner;
  let isDraw;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {

      let currentPlayer = deriveActivePlayer(prevGameTurns);
      
      let updatedGameTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevGameTurns];

      return updatedGameTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onNameChange={handleNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onNameChange={handleNameChange}/>
        </ol>
        { (winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
