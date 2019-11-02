import React from "react";
import Square from "./square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRowsAndColumns() {
    const size = this.props.size;
    const rows = [];

    let count = 0;

    for (let i = 0; i < size[0]; i++) {
      let cols = [];
      for (let j = 0; j < size[1]; j++) {
        cols.push(this.renderSquare(count));
        count++;
      }
      rows.push(
        <div key={i} className="board-row">
          {cols}
        </div>
      );
    }

    return rows;
  }

  render() {
    return <div>{this.renderRowsAndColumns()}</div>;
  }
}
