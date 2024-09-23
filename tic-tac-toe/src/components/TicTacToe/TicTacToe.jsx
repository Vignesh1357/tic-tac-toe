import React, { useEffect, useState } from "react";
import "./TicTacToe.css";

const initialValue = {
  text: null,
};

const TicTacToe = () => {
  const [blockSize, setblockSize] = useState(3);
  const [blocks, setBlocks] = useState([]);
  const [user, setUser] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningPatterns, setWinningPatterns] = useState([]);

  useEffect(() => {
    setBlocks(
      Array(blockSize * blockSize)
        .fill()
        .map(() => ({ ...initialValue }))
    );
    document.documentElement.style.setProperty("--block-size", `${blockSize}`);
    createWinnigPatterns(3);
  }, []);

  const handleClick = async (index) => {
    let updatedBlocks = blocks.map((block, ind) => {
      if (ind === index && !block.text) {
        if (user) {
          block.text = "X";
        } else {
          block.text = "O";
        }
      }
      return block;
    });
    setBlocks(updatedBlocks);
    setUser(!user);
    await checkMatchStatus();
  };

  const checkMatchStatus = async () => {
    let emptyCheck = [];
    blocks.map((block) => {
      if (!block.text) {
        emptyCheck.push(block);
      }
    });
    winningPatterns.map((pattern) => {
      let same = true;
      let val = blocks[pattern[0] - 1].text;

      if (val) {
        console.log(pattern, val);
        pattern.map((item) => {
          console.log(blocks[item - 1].text, item - 1, val);

          if (blocks[item - 1].text !== val) {
            same = false;
          }
        });
        if (same) {
          setWinner(val);
        }
      }
    });

    if (emptyCheck.length === 0 && !winner) {
      setIsDraw(true);
    }
  };

  const createWinnigPatterns = (size) => {
    let patterns = [];
    let pattern = [];

    for (let i = 1; i <= size * size; i++) {
      if (i % size === 0) {
        pattern.push(i);
        patterns.push(pattern);
        pattern = [];
      } else {
        pattern.push(i);
      }
    }

    for (let i = 1; i <= size; i++) {
      let j = i;
      while (j <= size * size) {
        pattern.push(j);
        j += size;
      }
      patterns.push(pattern);
      pattern = [];
    }

    let i = 1;
    while (i <= size * size) {
      pattern.push(i);
      i += size + 1;
    }
    patterns.push(pattern);
    pattern = [];

    i = size;
    while (i < size * size) {
      pattern.push(i);
      i += size - 1;
    }
    patterns.push(pattern);
    pattern = [];

    console.log("====================================");
    console.log(patterns);
    console.log("====================================");
    setWinningPatterns(patterns);
  };

  const handleReset = () => {
    setBlocks(
      Array(blockSize * blockSize)
        .fill()
        .map(() => ({ ...initialValue }))
    );
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div>
      {winner && `The winner is ${winner}`}
      {isDraw && "Match is a Tie!"}
      {(winner || isDraw) && <button onClick={handleReset}>Reset</button>}
      <div className="blocks-grid">
        {blocks.map((block, index) => (
          <button
            className="button"
            key={index}
            disabled={winner}
            onClick={() => handleClick(index)}
          >
            {block.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
