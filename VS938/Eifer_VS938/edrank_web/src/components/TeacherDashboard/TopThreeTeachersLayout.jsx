import React from 'react'
import './TopThreeTeachersLayout.scss';

function TopThreeTeachersLayout(props) {
  return (
    <div className='teacherLayout'>
        <p className='teacherRank'>{props.collegeRank}</p>
        <p className='teacherName'>{props.name}</p>
        <div className='teacherScore'>
            <p>{props.score}</p>    
        </div>
    </div>
  )
}

export default TopThreeTeachersLayout