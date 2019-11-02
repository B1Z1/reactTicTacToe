import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Board from "./components/board";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      size: [3, 3],
      moves: [],
      xIsNext: true,
      sortByGrow: true
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const moves = history.map((step, move) => {
      const desc = move ? `Go to ${move}` : `To start`;

      let column;
      let row;

      if (move) {
        column = (
          <p style={{ lineHeight: "0.4em" }}>
            Col: {this.getColumn(step.clicked)}
          </p>
        );
        row = (
          <p style={{ lineHeight: "0.4em" }}>
            Row: {this.getRow(step.clicked)}
          </p>
        );
      }

      return (
        <li key={move}>
          {column}
          {row}
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    if (squares[i] || this.calculateWinner(squares)) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          clicked: i
        }
      ]),
      moves: moves,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  getRow(clicked) {
    const squares = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    for (let i = 0; i < squares.length; i++) {
      const [a, b, c] = squares[i];
      if (a === clicked || b === clicked || c === clicked) return i + 1;
    }
    return null;
  }

  getColumn(clicked) {
    const squares = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    for (let i = 0; i < squares.length; i++) {
      const [a, b, c] = squares[i];
      if (a === clicked || b === clicked || c === clicked) return i + 1;
    }
    return null;
  }

  handleSort(event) {
    this.setState({
      sortByGrow: event.target.checked
    });
  }

  render() {
    const history = this.state.history;
    const moves = this.state.moves.slice();
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;

    this.state.sortByGrow ? moves.sort() : moves.reverse();

    if (winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next step: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            size={this.state.size}
            sorted={this.state.sortByGrow}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <input
            type="checkbox"
            checked={this.state.sortByGrow}
            onChange={ev => this.handleSort(ev)}
          />
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
