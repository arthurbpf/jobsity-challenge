import { combineReducers } from 'redux';

const reducers = {
  calendar: (state = {}, action) => {
    switch (action.type) {
      case 'selectDate':
        state.selectedDate = action.date;
        return state;
      case 'addReminder':
        const { id, description, date, time, city } = action.payload;

        const newReminders = [...state.reminders, {
          id,
          description,
          date,
          time,
          city
        }]

        state.reminders = newReminders;
        return state;
      default:
        return state;
    }
  }
};

export default combineReducers(reducers);
