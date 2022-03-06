import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import { BiTrash } from 'react-icons/bi';
import { RiAddCircleLine } from 'react-icons/ri';
import CityInput from '../CityInput';

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

      <div className={styles.reminders_container}>
        <div className={styles.reminder_card}>
          <div className={styles.field_container}>
            <label>Description</label>
            <input
              type="text"
              maxLength={30}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className={styles.field_container}>
            <label>Time</label>
            <input
              type="time"
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div>

          <div className={styles.field_container}>
            <label>City</label>
            <CityInput
              onChange={(value) => {
                setCity(value);
              }}
            />
          </div>

          <div className={styles.forecast_icon} />

          <button onClick={handleAddNewReminder}>
            <RiAddCircleLine />
          </button>
        </div>

        {reminders
          .filter((reminder) => isSameDay(selectedDate, reminder.date))
          .map((reminder) => (
            <div className={styles.reminder_card}>
              <div className={styles.field_container}>
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
              </div>

              <div className={styles.field_container}>
                <label>Time</label>
                <input
                  type="time"
                  value={reminder.time}
                  onChange={(event) => {
                    reminder.time = event.target.value;
                    handleUpdateReminder(reminder);
                  }}
                />
              </div>

              <div className={styles.field_container}>
                <label>City</label>
                <CityInput
                  value={`${reminder.city.name}, ${reminder.city.state || '?'}, ${reminder.city.country}`}
                  onChange={(value) => {
                    reminder.city = value;
                    handleUpdateReminder(reminder);
                  }}
                />
              </div>

              <div className={styles.forecast_icon} />

              <button onClick={() => handleDeleteReminder(reminder.id)}>
                <BiTrash />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RemindersPanel;
