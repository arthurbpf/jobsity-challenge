import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const CityInput = ({ onChange, value }) => {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!inputValue || options.includes(inputValue)) return;

      const url = 'http://api.openweathermap.org/geo/1.0/direct';
      const resp = await axios.get(url, {
        params: {
          appid: '93144ae7e8092eb32cb0a21b42245784',
          limit: 5,
          q: inputValue
        }
      });

      setCities([...resp.data]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const options = useMemo(
    () => [
      ...new Set(
        cities.map((city) => `${city.name}, ${city.state}, ${city.country}`)
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
        city.state === keys[1] &&
        city.country === keys[2]
    );

    setInputValue(value);
    onChange(city);
  };

  return (
    <>
      <input
        type="text"
        list="cities"
        value={value}
        onChange={handleInputChange}
      />
      <datalist id="cities">
        {options.map((opt) => (
          <option>{opt}</option>
        ))}
      </datalist>
    </>
  );
};

export default CityInput;
