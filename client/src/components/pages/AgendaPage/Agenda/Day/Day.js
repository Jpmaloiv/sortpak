import React from 'react';
import cn from 'classnames'
import Moment from 'react-moment'

// Components
import {
  Icon,
} from '../../../../common'

import styles from './Day.css'


const Day = ({ day, reps, onClick, today }) => {
  const className = cn(styles.day, { outside: !day, today })
  if (!day) {
    return (
      <div className={className} />
    )
  } else {
    var data = reps;
    var names = [];
    var uniquesData = [];
    var index;
    for (var i = 0; i < data.length; i++) {
      index = names.indexOf(data[i].Rep);
      if (index == -1) {
        names.push(data[i].Rep);
        uniquesData.push(data[i]);
      } else {
        uniquesData[index].DIFF += data[i].DIFF;
      }
    }
    const filteredReps = uniquesData;
    return (
      <div className={className}>
        <Icon>
          {day}
        </Icon>

        {filteredReps.map(rep => (
          <span
            key={rep.id}
            className="rep-name"
            onClick={() => onClick({ rep, reps })}
          >
            {rep.Rep}
          </span>
        ))}
      </div>
    )
  }
}

export default Day;
