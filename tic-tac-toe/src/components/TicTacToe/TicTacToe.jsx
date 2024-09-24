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
  const [disabled, setDisabled] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (blockSize) {
      (async () => {
        setBlocks(
          Array(blockSize * blockSize)
            .fill()
            .map(() => ({ ...initialValue }))
        );
        document.documentElement.style.setProperty(
          "--block-size",
          `${blockSize}`
        );
        await createWinnigPatterns(blockSize);
      })();
      setUser(false);
    }
  }, [blockSize]);

  const handleZoom = () => {
    setZoom(true);
    setTimeout(() => {
      setZoom(false);
    }, 500);
  };

  const handleClick = async (index) => {
    setDisabled(true);
    await new Promise((resolve) => {
      setBlocks((prevBlocks) => {
        let updatedBlocks = prevBlocks.map((block, ind) => {
          if (ind === index && !block.text) {
            if (user) {
              block.text = "X";
            } else {
              block.text = "O";
            }
          }
          return block;
        });
        checkMatchStatus(updatedBlocks);
        return updatedBlocks;
      });
      resolve();
      setDisabled(false);
    });
    setUser(!user);
  };

  const checkMatchStatus = (updatedBlocks) => {
    let emptyCheck = [];
    updatedBlocks.map((block) => {
      if (!block.text) {
        emptyCheck.push(block);
      }
    });
    winningPatterns.map((pattern) => {
      let same = true;
      let val = updatedBlocks[pattern[0] - 1].text;

      if (val) {
        pattern.map((item) => {
          if (updatedBlocks[item - 1].text !== val) {
            same = false;
          }
        });
        if (same) {
          setZoom(true);
          setWinner(val);
        }
      }
    });

    if (emptyCheck.length === 0 && !winner) {
      setZoom(true);
      setIsDraw(true);
    }
  };

  const createWinnigPatterns = async (size) => {
    await new Promise((resolve) => {
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
          console.log(j, size, j + size, size * size);

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
      resolve();
    });
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

  const handleChange = (e) => {
    let val = e.target.value;
    if (val ? val < 11 && val > 2 : true) setblockSize(parseInt(val));
  };

  return (
    <div>
      {winner && (
        <h3 className={zoom ? "zoom" : ""}>{`The winner is ${winner}`}</h3>
      )}
      {isDraw && <h3 className={zoom ? "zoom" : ""}>Match is a Tie!</h3>}
      <div>
        <label>
          <h4>
            Enter the size of the block :
            <input
              value={blockSize}
              type="number"
              className="block-size"
              onChange={handleChange}
              max={10}
              min={3}
            />{" "}
            X {blockSize}
          </h4>
        </label>
      </div>
      {(winner || isDraw) && (
        <div className="reset-container">
          {" "}
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
      <div className="blocks-grid">
        {blocks?.map((block, index) => (
          <button
            className="button"
            key={index}
            disabled={winner || disabled}
            onClick={async () => await handleClick(index)}
          >
            {block.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
