import { openWeather } from './openWeather.environment';
export const environment = {
  production: true,
  openWeather: {
    apiKey: openWeather.openWeather.apiKey,
  },
};
