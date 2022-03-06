import {
  add,
  endOfMonth,
  endOfWeek,
  format,
  formatISO,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  startOfDay
} from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CalendarDay from '../components/CalendarDay';
import RemindersPanel from '../components/RemindersPanel';
import styles from '../sass/Calendar.module.scss';

function Calendar(props) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const [firstDateOfMonth, setFirstDateOfMonth] = useState(
    startOfMonth(new Date())
  );

  const calendarDays = useMemo(() => {
    const firstVisibleDate = startOfWeek(firstDateOfMonth);
    const lastVisibleDate = endOfWeek(endOfMonth(firstDateOfMonth));

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const days = weekDays.map((day) => (
      <div key={day} className={styles.calendar_header_container}>
        <h4>{day}</h4>
      </div>
    ));

    for (
      let d = firstVisibleDate;
      d <= lastVisibleDate;
      d.setDate(d.getDate() + 1)
    ) {
      const day = new Date(d);

      const isActive =
        isSameMonth(d, firstDateOfMonth) &&
        !isBefore(d, startOfDay(new Date()));
      const isSelected = isSameDay(d, selectedDate);

      days.push(
        <CalendarDay
          key={formatISO(day, { representation: 'date' })}
          date={day}
          isActive={isActive}
          isSelected={isSelected}
          onClick={() => {
            dispatch({ type: 'selectDate', date: day });
          }}
        />
      );
    }

    return days;
  }, [firstDateOfMonth, selectedDate]);

  const handleMonthChange = (event) => {
    const inputDate = event.target.valueAsDate;
    if (!inputDate) return;

    const newDate = add(inputDate, { minutes: inputDate.getTimezoneOffset() });
    setFirstDateOfMonth(newDate);
    dispatch({ type: 'selectDate', date: newDate });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_container}>
        <h1>Calendar</h1>
        <input
          type="month"
          value={format(firstDateOfMonth, 'yyyy-MM')}
          onChange={handleMonthChange}
        />
      </div>

      <div className={styles.calendar_container}>{calendarDays}</div>
      <RemindersPanel />
    </div>
  );
}

export default Calendar;
