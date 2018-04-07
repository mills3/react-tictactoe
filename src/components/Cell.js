import React from 'react'

const Cell = ({ introClassName, delay, display, animationClassName, winClassName, handleClick, id }) => {

  return (
    <div className={`cellContainer `}>
      <div className={`cell ${animationClassName} ${introClassName} ${winClassName}`} style={{ animationDelay: `${delay}s`}} onClick={() => handleClick(id)}>
        <div className="back">{display}</div>
        <div className="front"></div>
      </div>
    </div>
  )
}

export default Cell
