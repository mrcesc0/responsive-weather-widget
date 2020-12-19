import $ from 'jquery';

import HttpClient from './shared/http-client';
import WeatherController from './controllers/weather-controller';
import { CLIENT_SECRET, CLIENT_ID, ENDPOINT, APP_ID } from './shared/config';

import './styles/scss/index.scss';

/**
 * New Http Client instance
 */
const httpClient = new HttpClient({
  clientSecret: CLIENT_SECRET,
  clientId: CLIENT_ID,
  appId: APP_ID,
  endpoint: ENDPOINT,
});

/**
 * New Weather Controller instance
 */
const weatherController = new WeatherController(httpClient, {
  locations: [
    'london,uk',
    'milan,it',
    'bangkok,th',
    'los-angeles,ca',
    'nairobi,ke',
  ],
});

/**
 * Specify a function to execute when the DOM is fully loaded.
 * @see{@link https://api.jquery.com/ready/}
 */
$(() => {
  weatherController.requestData().done(() => {
    weatherController.draw();
  });
});
