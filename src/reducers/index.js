import { combineReducers } from 'redux';

const reducers = {
  calendar: (state = {}, action) => {
    switch (action.type) {
      case 'selectDate':
        state.selectedDate = action.date;
        return state;
      case 'addReminder':
        let { id, description, date, time, city } = action.payload;

        state.reminders = [
          ...state.reminders,
          {
            id,
            description,
            date,
            time,
            city
          }
        ];
        return state;
      case 'updateReminder':
        const reminderIdx = state.reminders.findIndex(reminder => reminder.id === action.payload.id)
        state.reminders[reminderIdx] = action.payload;
        state.reminders = [...state.reminders];
        console.log(state);
        return state;
      case 'deleteReminder':
        state.reminders = state.reminders.filter(
          (reminder) => reminder.id !== action.id
        );
        return state;
      default:
        return state;
    }
  }
};

export default combineReducers(reducers);
