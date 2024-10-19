import "./styles.css";
import { useState } from "react";
const gridSize = 8;
const calculateRowCol = (id) => {
  const ids = id.split("-");
  return {
    row: +ids[1],
    col: +ids[2],
  };
};

const ChessBox = ({ id, isSelected }) => {
  const { row, col } = calculateRowCol(id);
  const calculatedClass =
    row % 2 === 0
      ? col % 2 === 0
        ? ""
        : "bg-black"
      : col % 2 !== 0
      ? ""
      : "bg-black";
  return (
    <div
      className={`chessBox ${isSelected ? "bg-red" : calculatedClass}`}
      id={id}
    ></div>
  );
};

export default function App() {
  const [selectedCells, setSelectedCells] = useState([]);

  const onClickHandler = (e) => {
    const id = e?.target?.id;
    const selectedCellArray = [id];
    const { row, col } = calculateRowCol(id);
    let j = col;
    for (let i = row - 1; i >= 0 && j >= 0; i--) {
      selectedCellArray.push(`key-${i}-${--j}`);
    }
    j = col;
    for (let i = row + 1; i < gridSize && j >= 0; i++) {
      selectedCellArray.push(`key-${i}-${--j}`);
    }
    j = col;
    for (let i = row - 1; i >= 0 && j < gridSize; i--) {
      selectedCellArray.push(`key-${i}-${++j}`);
    }
    j = col;
    for (let i = row + 1; i < gridSize && j < gridSize; i++) {
      selectedCellArray.push(`key-${i}-${++j}`);
    }
    setSelectedCells(selectedCellArray);
  };

  return (
    <div onClick={onClickHandler}>
      {Array(gridSize)
        .fill("")
        .map((_, rowIndex) => (
          <div style={{ display: "flex" }}>
            {Array(gridSize)
              .fill("")
              .map((_, colIndex) => (
                <ChessBox
                  id={`key-${rowIndex}-${colIndex}`}
                  isSelected={selectedCells.includes(
                    `key-${rowIndex}-${colIndex}`
                  )}
                />
              ))}
          </div>
        ))}
    </div>
  );
}
