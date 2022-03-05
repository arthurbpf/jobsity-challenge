import React from 'react';
import { useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import styles from './CalendarDay.module.scss';

const CalendarDay = (props) => {
  const reminders = useSelector((state) => state.calendar.reminders);
  const { date, isActive, isSelected, onClick } = props;

  return (
    <a onClick={onClick}>
      <div
        className={isSelected ? styles.container_selected : styles.container}
      >
        <b className={!isActive ? styles.inactive : null}>{date.getDate()}</b>
        {reminders
          .filter((reminder) => isSameDay(date, reminder.date))
          .map((reminder) => reminder.description)}
      </div>
    </a>
  );
};

export default CalendarDay;
