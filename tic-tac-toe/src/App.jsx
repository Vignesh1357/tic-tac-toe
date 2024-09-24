import { useState } from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe/TicTacToe";

function App() {
  return (
    <div className="app">
      <div>
        <h1>Tic Tac Toe</h1>
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
