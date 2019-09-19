/* eslint-disable no-null/no-null */
import React from 'react';
import './Tutor.css';

interface PropSquare {
  value: 'X' | 'O' | null;
  onClick: () => void;
}

type Squares = ('X' | 'O' | null)[];
function calculateWinner(squares: Squares): 'X' | 'O' | null {
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
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
/**
 * props.onClick from Game -> Board -> Square
 *
 */
const Square: React.SFC<PropSquare> = ({ onClick: handleClick, value }) => (
  <button className="square" onClick={() => handleClick()}>
    {value}
  </button>
);

interface PropsBoard {
  squares: Squares;
  onClick: (i: number) => void;
}

class Board extends React.Component<PropsBoard> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface HistoryItem {
  squares: Squares;
}
interface StateGame {
  xIsNext: boolean;
  history: HistoryItem[];
  stepNumber: number;
}
const initStates = {
  xIsNext: true,
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0
};

export default class Game extends React.Component<{}, StateGame> {
  readonly state: StateGame = initStates;
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step: number) {
    // console.log(step)
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = [...this.state.history];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = `Winner is : ${winner}`;
    }
    else {
      status = `Next player is : ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
