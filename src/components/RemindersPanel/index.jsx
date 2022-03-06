import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import { BiTrash } from 'react-icons/bi';
import { RiAddCircleLine } from 'react-icons/ri';
import CityInput from '../CityInput';
import ForecastIcon from '../ForecastIcon';

import styles from './RemindersPanel.module.scss';

const RemindersPanel = () => {
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const reminders = useSelector((state) => state.calendar.reminders);
  const dispatch = useDispatch();

  const [description, setDescription] = useState();
  const [time, setTime] = useState();
  const [city, setCity] = useState();
  const [cityInputValue, setCityInputValue] = useState();

  const handleAddNewReminder = () => {
    dispatch({
      type: 'addReminder',
      payload: {
        id: crypto.randomUUID(),
        description,
        date: selectedDate,
        time,
        city: city || {}
      }
    });
    setDescription('');
    setTime('');
    setCity({});
    setCityInputValue('');
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

  const remindersCards = useMemo(() => {
    return reminders
      .filter((reminder) => isSameDay(selectedDate, reminder.date))
      .map((reminder) => (
        <div className={styles.reminder_card} key={reminder.id}>
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
              reminderId={reminder.id}
              value={`${reminder.city.name}, ${reminder.city.state || '?'}, ${
                reminder.city.country
              }`}
              onChange={(value) => {
                reminder.city = value;
                handleUpdateReminder(reminder);
              }}
            />
          </div>

          <div className={styles.forecast_icon}>
            <ForecastIcon
              lat={reminder.city.lat}
              lon={reminder.city.lon}
              date={reminder.date}
            />
          </div>

          <button onClick={() => handleDeleteReminder(reminder.id)}>
            <BiTrash />
          </button>
        </div>
      ));
  });

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
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className={styles.field_container}>
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div>

          <div className={styles.field_container}>
            <label>City</label>
            <CityInput
              value={cityInputValue}
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

        {remindersCards}
      </div>
    </div>
  );
};

export default RemindersPanel;
