import React, { Component } from 'react'

import { CSSTransitionGroup } from 'react-transition-group'

import IntroGrid from './components/IntroGrid'
import Grid from './components/Grid'
import Selection from './components/Selection'
import Scores from './components/Scores'
import Message from './components/Message'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intro: true,
      selecting: false,
      introGrid: ['t','i','c','t','a','c','t','o','e'],
      grid: [0,1,2,3,4,5,6,7,8],
      wins: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
      winningLine: null,
      human: null,
      humanScore: 0,
      humanTurn: false,
      ai: null,
      aiScore: 0,
      darkTheme: true,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      intro: false,
      selecting: true,
    }), 6000)
  }

  selectSymbol = (symbol) => {
    let ai = symbol === 'X' ? 'O' : 'X'
    this.setState({
      human: symbol,
      ai,
      selecting: false,
      humanTurn: true,
      message: 'Start',
    })
  }

  cellClick = (id) => {
    console.log(id)
    //if cell is empty ........
    if(this.state.grid[id] !== 'X' && this.state.grid[id] !== 'O') {
      if(!this.state.gameOver && this.state.humanTurn) {
        let copy = this.state.grid
        copy[id] = this.state.human
        this.setState({ grid: copy, humanTurn: false }, () => {
          if(this.checkForWin(this.state.grid, this.state.human)) {
            this.setState({ gameOver: true, gameResult: 'won', playerScore: this.state.playerScore + 1 })
            return
          }
          setTimeout(() => this.aiMove(), 500)
        })
      }
    }

  }

  minimax = (newBoard, player) => {
    const { human, ai } = this.state

    //The available cells
    let emptyCells = this.getEmptyCells(newBoard)

    //Check for terminal states(win, lose or draw)
    if(this.checkForWin(newBoard, human)) {
      return { score: -10 }
    } else if(this.checkForWin(newBoard, ai)) {
      return { score: 10 }
    } else if(emptyCells.length === 0) {
      return { score: 0 }
    }

    //Array of objects (cell position and score)
    let moves = []

    //Loop through the empty cells and create the move object
    for(let i = 0; i < emptyCells.length; i++) {
      let move = {}
      move.index = newBoard[emptyCells[i]]

      //Set the empty cell to the current player
      newBoard[emptyCells[i]] = player

      //Get the score from calling minimax on the opponent of current player
      if(player === ai) {
        let result = this.minimax(newBoard, human)
        move.score = result.score
      } else {
        let result = this.minimax(newBoard, ai)
        move.score = result.score
      }

      //Reset the cell to empty
      newBoard[emptyCells[i]] = move.index

      //Push the object to moves array
      moves.push(move)
    }

    let bestMove
    if(player === ai) {
      let bestScore = -10000
      for(let i = 0; i < moves.length; i++) {
        if(moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } else {
      let bestScore = 10000
      for(let i = 0; i < moves.length; i++) {
        if(moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }

    return moves[bestMove]
  }

  checkForWin = (board, player) => {
    for(let i = 0; i < this.state.wins.length; i++) {
      let [a,b,c] = this.state.wins[i]
      if(board[a] === player && board[b] === player && board[c] === player) {
        return true
      }
    }
    return false
  }

  getEmptyCells = (board) => {
    return board.filter(cell => cell !== 'X' && cell !== 'O')
  }

  getWinningLine = () => {
    const { grid, ai } = this.state
    for(let i = 0; i < this.state.wins.length; i++) {
      let [a,b,c] = this.state.wins[i]
      if(grid[a] === ai && grid[b] === ai && grid[c] === ai) {
        return [a,b,c]
      }
    }
  }

  aiMove = () => {
    let bestMove = this.minimax(this.state.grid, this.state.ai)
    console.log(bestMove)
    if(!bestMove.index && bestMove.index !== 0) {
      this.setState({ gameOver: true, gameResult: 'tied' })
    }

    let copy = this.state.grid
    copy[bestMove.index] = this.state.ai
    this.setState({ grid: copy, humanTurn: true }, () => {
      if(this.checkForWin(this.state.grid, this.state.ai)) {
        this.setState({ gameOver: true, gameResult: 'lost', aiScore: this.state.aiScore + 1, winningLine: this.getWinningLine() })
      }
    })
  }

  playAgain = () => {
    const cleanBoard = [0,1,2,3,4,5,6,7,8]
    this.setState({
      grid: cleanBoard,
      gameOver: false,
      gameResult: null,
      winningLine: null,
    })
  }

  toggleTheme = () => {
    if(this.state.darkTheme) {
      document.body.style.setProperty('--mainColor', '#f2f2f2')
      document.body.style.setProperty('--textColor', '#2a2a2a')
      document.body.style.setProperty('--cellFrontColor', 'linear-gradient(-45deg, #ce9ed2, #a6f0f2)')
      document.body.style.setProperty('--highlight', '#74c8cb')
      document.body.style.setProperty('--shadow', ' #ce9ed2')
    } else {
      document.body.style.setProperty('--mainColor', '#2a2a2a')
      document.body.style.setProperty('--textColor', '#f2f2f2')
      document.body.style.setProperty('--cellFrontColor', '#3a3a3a')
      document.body.style.setProperty('--highlight', '#df2525')
      document.body.style.setProperty('--shadow', '#fff')
    }

    this.setState({darkTheme: !this.state.darkTheme})
  }

  render() {
    const transitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 200,
    }

    const { grid, human, ai, humanScore, aiScore, gameResult, winningLine } = this.state

    return (
      <div className="app">
        <div className="theme" onClick={this.toggleTheme}></div>
        
        <div className="top">
          <CSSTransitionGroup {...transitionOptions}>
            { !this.state.intro && this.state.selecting && <Selection select={this.selectSymbol}/>}
            { !this.state.intro && !this.state.selecting && this.state.gameOver&& <Message result={gameResult} handleClick={this.playAgain}/>}
          </CSSTransitionGroup>
      </div>

        { this.state.intro && <IntroGrid introGrid={this.state.introGrid} intro={this.state.intro}/> }
        { !this.state.intro && <Grid grid={grid} cellClick={this.cellClick} human={human} ai={ai} winningLine={winningLine}/> }

        <CSSTransitionGroup {...transitionOptions}>
          { !this.state.intro && <Scores human={humanScore} ai={aiScore}/> }
        </CSSTransitionGroup>

      </div>
    );
  }
}

export default App;
