import React, { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import {
  BsSnow,
  BsCloudRain,
  BsCloudFog,
  BsWind,
  BsCloudy,
  BsCloudSun,
  BsCloudMoon,
  BsSun,
  BsMoon,
  BsQuestion
} from 'react-icons/bs';

const ForecastIcon = ({ lat, lon, date }) => {
  const [iconName, setIconName] = useState();
  const [description, setDescription] = useState();

  useEffect(async () => {
    if (!lat || !lon || !date) return;
    const forecast = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${format(
        date,
        'yyyy-MM-dd'
      )}`,
      {
        params: {
          key: process.env.REACT_APP_VISUALCROSSING_API_KEY
        }
      }
    );

    const dayConditions = forecast.data.days[0] || {
      icon: '',
      conditions: ''
    };

    setIconName(dayConditions.icon);
    setDescription(dayConditions.description);
  }, []);

  const icon = useMemo(() => {
    switch (iconName) {
      case 'snow':
        return <BsSnow />;
      case 'rain':
        return <BsCloudRain />;
      case 'fog':
        return <BsCloudFog />;
      case 'wind':
        return <BsWind />;
      case 'cloudy':
        return <BsCloudy />;
      case 'partly-cloudy-day':
        return <BsCloudSun />;
      case 'partly-cloudy-night':
        return <BsCloudMoon />;
      case 'clear-day':
        return <BsSun />;
      case 'clear-night':
        return <BsMoon />;
      default:
        return <BsQuestion />;
    }
  }, [iconName, description]);

  return <>{icon}</>;
};

export default ForecastIcon;
