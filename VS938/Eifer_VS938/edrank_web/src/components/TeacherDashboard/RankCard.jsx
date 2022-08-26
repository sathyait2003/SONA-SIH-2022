import React from 'react'
import './RankCard.scss';

function RankCard(props) {
  return (
    <div className='teacherRankCard'>
        <p className='rankType'>{props.ranktype}</p>
        <p className='myRank'>{props.rank}</p>
    </div>
  )
}

export default RankCard