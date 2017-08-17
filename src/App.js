import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        "", "", "",
        "", "", "",
        "", "", ""
      ],
      maxPlayer: "X",
      minPlayer: "0"
    }
  }
  clickHandler(val,board) {
    if (this.checkWinner(this.state.board,this.state.maxPlayer)) {
      alert("X player Won")
    }
    else if (this.checkWinner(this.state.board,this.state.minPlayer)) {
      alert("Y player Won")
    }
    else if (this.Tie(this.state.board)) {
      alert("Tie")
    }
    else {
    var newBoard = this.validMove(this.state.board, val, this.state.maxPlayer);
    if (newBoard) {
      this.setState({ board: newBoard });
      console.log(newBoard)
    }
    else {
      alert("Already Exist");
    }
      this.findAiMove(this.state.board);
    }
  }
  validMove(board, move, player) {
    var newBoard = board;
    if (newBoard[move] === "") {
      newBoard[move] = player;
      return newBoard;
    }
    else {
      return null
    }
  }
  findAiMove(board) {
    var bestMoveScore = 100;
    let move = null;
    if (this.checkWinner(board, "X") || this.checkWinner(board, "0" || this.Tie(board))) {
      return null;
    }
    for (var i = 0; i < board.length; i++) {
      let newBoard = this.validMove(board, i, this.state.minPlayer, board);
      if (newBoard) {
        var bestMove = this.maximumPlayer(newBoard);
        if (bestMove < bestMoveScore) {
          bestMoveScore = bestMove;
          move = i
        }
      }
    }
    return move;
  }
  maximumPlayer(board) {
    if (this.checkWinner(board, 'X')) {
      return 10;
    } else if (this.checkWinner(board, '0')) {
      return -10;
    } else if (this.Tie(board)) {
      return 0;
    } else {
      var bestMoveValue = -100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(board, i, this.state.maxPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.minimumPlayer(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }
  }
  minimumPlayer(board) {
    if (this.checkWinner(board, this.state.maxPlayer)) {
      return 10;
    } else if (this.checkWinner(board, this.state.minPlayer)) {
      return -10;
    } else if (this.Tie(board)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(board, i, '0', board);
        if (newBoard) {
          var predictedMoveValue = this.maximumPlayer(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      //console.log("Best Move Value(minScore):", bestMoveValue);
      return bestMoveValue;
    }
  }
  changePlayer = () => {
    this.setState({ player: this.state.player ^ 1 })
  }

  Tie = (board) => {
    let currentBoard = board.join('').replace(/ /g, '');
    if (currentBoard.length === 9)
      return true;
    return false;
  }
  checkWinner(board, player) {
    let currentboard = null;
    currentboard = board;
    if (currentboard[0] === player && currentboard[1] === player && currentboard[2] === player) {
      return true;
    }
    else if (currentboard[0] === player && currentboard[3] === player && currentboard[6] === player) {
      return true;
    }
    else if (currentboard[0] === player && currentboard[4] === player && currentboard[8] === player) {
      return true;
    }
    else if (currentboard[4] === player && currentboard[5] === player && currentboard[6] === player) {
      return true;
    }
    else if (currentboard[7] === player && currentboard[8] === player && currentboard[9] === player) {
      return true;
    }
    else if (currentboard[2] === player && currentboard[4] === player && currentboard[6] === player) {
      return true;
    }
    else if (currentboard[1] === player && currentboard[4] === player && currentboard[7] === player) {
      return true;
    }
    else if (currentboard[2] === player && currentboard[5] === player && currentboard[8] === player) {
      return true;
    }
    else {
      return false;
    }
  }
  render() {
    console.log(this.state.board)
    return (
      <div className="board">
        {this.state.board.map((arr, indx) => {
          return <div key={indx} onClick={this.clickHandler.bind(this, indx,this.state.board)} className="box">{arr}</div>
        })}
      </div>

    );
  }
}

export default App;
