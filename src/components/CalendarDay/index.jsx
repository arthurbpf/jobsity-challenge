import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isSameDay, isToday } from 'date-fns';
import styles from './CalendarDay.module.scss';

const CalendarDay = (props) => {
  const reminders = useSelector((state) => state.calendar.reminders);
  const { date, isActive, isSelected, onClick } = props;
  const numberOfReminders = useMemo(
    () => reminders.filter((reminder) => isSameDay(date, reminder.date)).length,
    [reminders]
  );

  return (
    <a onClick={onClick}>
      <div
        className={isSelected ? styles.container_selected : styles.container}
      >
        <b
          className={`${styles.day_marker} ${ isToday(date) ? styles.today_marker : !isActive ? styles.inactive_text : null }`}
        >
          {date.getDate()}
        </b>
        {numberOfReminders > 0 ? (
          <b
            className={`${styles.reminders_container} ${!isActive ? styles.inactive_text : styles.highlighted_text} `}
          >
            {`${numberOfReminders} reminder${numberOfReminders > 1 ? 's' : ''}`}
          </b>
        ) : null}
      </div>
    </a>
  );
};

export default CalendarDay;
