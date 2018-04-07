import React from 'react'

import Cell from './Cell'

const Grid = ({ intro, grid, cellClick, winningLine }) => {

  return (
    <div className="grid">
      {
        grid.map((cell, i) => {
          let flip = cell === 'X' || cell === 'O' ? 'flip' : ''
          let display = cell === 'X' || cell === 'O' ? cell : null
          let flash = ''
          if(winningLine) {
            let [a,b,c] = winningLine
            if(i === a || i === b || i === c) {
              flash = 'flash'
            }
          }



          return <Cell
            key={i}
            display={display}
            id={i}
            animationClassName={flip}
            winClassName={flash}
            handleClick={cellClick}
          />
        })
      }
    </div>
  )
}

export default Grid
