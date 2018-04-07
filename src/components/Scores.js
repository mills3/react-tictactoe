import React from 'react'

import Score from './Score'

const Scores = (props) => {
  return (
    <div className="scores">
      <Score type='Humans' score={props.human}/>
      <Score type='The Machines' score={props.ai}/>
    </div>
  )
}

export default Scores
