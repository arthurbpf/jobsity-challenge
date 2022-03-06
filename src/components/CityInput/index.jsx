import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const CityInput = ({ onChange, value, reminderId = '' }) => {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!inputValue || options.includes(inputValue)) return;

      const url = 'http://api.openweathermap.org/geo/1.0/direct';
      const resp = await axios.get(url, {
        params: {
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          limit: 5,
          q: inputValue
        }
      });

      setCities([...resp.data]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(()=>{
    if (value == '') setInputValue('')

  },[value])

  const options = useMemo(
    () => [
      ...new Set(
        cities.map((city) => `${city.name}, ${city.state || '?'}, ${city.country}`)
      )
    ],
    [cities]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    const keys = value.split(',').map((key) => key.trim());
    const city = cities.find(
      (city) =>
        city.name === keys[0] &&
        (city.state === keys[1] || city.state == undefined) &&
        city.country === keys[2]
    );

    setInputValue(value);
    onChange(event, city || {});
  };

  return (
    <>
      <input
        type="text"
        list={`cities${reminderId}`}
        value={inputValue}
        onChange={handleInputChange}
      />
      <datalist id={`cities${reminderId}`}>
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </datalist>
    </>
  );
};

export default CityInput;
