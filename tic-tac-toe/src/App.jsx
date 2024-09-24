import { useState } from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe/TicTacToe";

function App() {
  return (
    <div className="app">
      <div>
        <div className="blocks">
          <h1>Tic Tac Toe</h1>
        </div>
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
