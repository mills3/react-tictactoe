import React from 'react'

const Selection = ({ select }) => {
  return (
    <div className="selection">
      <p>Choose</p>
      <button onClick={() => select('X')}>X</button>
      <button onClick={() => select('O')}>O</button>
    </div>
  )
}

export default Selection
