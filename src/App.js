import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  state = {
    board: [
      "", "", "",
      "", "", "",
      "", "", ""
    ],
    maxPlayer: "X",
    minPlayer: "0"
  }
  clickHandler = (val) => {
    if (this.checkWinner(this.state.maxPlayer)) {
      alert("X player Won")
    }
    else if (this.checkWinner(this.state.minPlayer)) {
      alert("Y player Won")
    }
    else if (this.Tie()) {
      alert("Tie")
    }
    else {
      var newBoard = this.validMove(val, this.state.maxPlayer);
      if (newBoard) {
        this.setState({ board: newBoard });
        console.log("NAhi Chalna", newBoard)
        this.findAiMove();
      }
      else {
        alert("Already Exist");
      }
    }
  }
  validMove(move, player) {
    var newBoard = this.state.board;
    if (newBoard[move] === "") {
      newBoard[move] = player;
      return newBoard;
    }
    else {
      return null
    }
    // return null;
  }
  findAiMove = () => {
    let bestMoveScore = 100;
    let move = null;
    if (this.checkWinner("X") || this.checkWinner("0" || this.Tie())) {
      return null;
    }
    for (var i = 0; i < this.state.board.length; i++) {
      let newBoard = this.validMove(i, "0", this.state.board);
      if (newBoard) {
        return 2;
      }
    }
    return move;
  }
  changePlayer = () => {
    this.setState({ player: this.state.player ^ 1 })
  }

  Tie = () => {
    let currentBoard = this.state.board.join('').replace(/ /g, '');
    if (currentBoard.length === 9)
      return true;
    return false;
  }
  checkWinner(player) {
    let currentboard = this.state.board;
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
    return (
      <div className="board">
        {this.state.board.map((arr, indx) => {
          return <div key={indx} onClick={() => this.clickHandler(indx)} className="box">{arr}</div>
        })}
      </div>

    );
  }
}

export default App;
