import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';
import { BiTrash } from 'react-icons/bi';
import { RiAddCircleLine } from 'react-icons/ri';

import styles from './RemindersPanel.module.scss';

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

  const handleUpdateReminder = (updatedInfo) => {
    dispatch({
      type: 'updateReminder',
      payload: updatedInfo
    });
  };

  const handleDeleteReminder = (id) => {
    dispatch({
      type: 'deleteReminder',
      id
    });
  };

  return (
    <div className={styles.main_container}>
      <h2>Reminders</h2>

      <div className={styles.new_reminder_container}>
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

        <button onClick={handleAddNewReminder}>
          <RiAddCircleLine />
        </button>
      </div>

      {reminders
        .filter((reminder) => isSameDay(selectedDate, reminder.date))
        .map((reminder) => (
          <>
            <label>Description</label>
            <input
              type="text"
              maxLength={30}
              value={reminder.description}
              onChange={(event) => {
                reminder.description = event.target.value;
                handleUpdateReminder(reminder);
              }}
            />

            <label>Time</label>
            <input
              type="time"
              value={reminder.time}
              onChange={(event) => {
                reminder.time = event.target.value;
                handleUpdateReminder(reminder);
              }}
            />

            <label>City</label>
            <input
              type="text"
              value={reminder.city}
              onChange={(event) => {
                reminder.city = event.target.value;
                handleUpdateReminder(reminder);
              }}
            />

            <button onClick={() => handleDeleteReminder(reminder.id)}>
              <BiTrash />
            </button>
          </>
        ))}
    </div>
  );
};

export default RemindersPanel;
