import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { format, isSameDay } from 'date-fns';

const RemindersPanel = () => {
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const reminders = useSelector((state) => state.calendar.reminders);
  const dispatch = useDispatch();

  const [description, setDescription] = useState();
  const [time, setTime] = useState();
  const [city, setCity] = useState();

  const handleAddNewReminder = () => {
    dispatch({
      type: 'addReminder',
      payload: {
        id: crypto.randomUUID(),
        description,
        date: selectedDate,
        time,
        city
      }
    });
  };

  return (
    <div>
      <h3>Reminders for {format(selectedDate, 'MM/dd/yyyy')}</h3>

      <label>Description</label>
      <input
        type="text"
        maxLength={30}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <label>Time</label>
      <input
        type="time"
        onChange={(event) => {
          setTime(event.target.value);
        }}
      />

      <label>City</label>
      <input
        type="text"
        onChange={(event) => {
          setCity(event.target.value);
        }}
      />

      <button onClick={handleAddNewReminder}>ADD NEW REMINDER</button>
    </div>
  );
};

export default RemindersPanel;
