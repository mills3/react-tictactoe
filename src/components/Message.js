import React from 'react'

const Message = ({ result, handleClick }) => {
  return (
    <div className="message">
      <p>You have {result}</p>
      <button onClick={handleClick}>Play Again</button>
    </div>
  )
}

export default Message
