import React from 'react';
import styles from './CalendarDay.module.scss';

const CalendarDay = (props) => {
  const { date, isActive, isSelected, onClick } = props;

  return (
    <a onClick={onClick}>
      <div className={isSelected ? styles.container_selected : styles.container}>{date.getDate()}</div>
    </a>
  );
};

export default CalendarDay;
