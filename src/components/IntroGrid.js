import React from 'react'

import Cell from './Cell'

const IntroGrid = ({ intro, introGrid }) => {
  let introClass = intro ? 'introCell' : ''
  return (
    <div className="introGrid grid">
      {
        introGrid.map((letter, i) => {
          let delay = i / 4
          return <Cell display={letter} key={i} delay={delay} introClassName={introClass}/>
        })
      }
    </div>
  )
}

export default IntroGrid
