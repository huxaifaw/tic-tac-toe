import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevGameTurns) => {

      let currentPlayer = 'X';

      if (prevGameTurns.length > 0 && prevGameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      
      let updatedGameTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevGameTurns];

      return updatedGameTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
