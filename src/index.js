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
  dotsId: 'dots',
  carouselId: 'carousel',
  locations: [
    {
      name: 'london,uk',
      image:
        'https://imageproxy.themaven.net//https%3A%2F%2Fwww.history.com%2F.image%2FMTYyNDg1MjE3MTI1Mjc5Mzk4%2Ftopic-london-gettyimages-760251843-promo.jpg',
    },
    {
      name: 'milan,it',
      image:
        'https://www.hotelsantabarbara.it/sites/barbara2torri.gisnet.it/files/Hotel_Santa_Barbara_Milano_01t.jpg',
    },
    {
      name: 'bangkok,th',
      image:
        'https://www.karoundtheworld.org/wp-content/uploads/2018/05/bangkok.jpg',
    },
    {
      name: 'los-angeles,ca',
      image:
        'https://images.lonelyplanetitalia.it/uploads/los-angeles?q=80&p=slider&s=4cc9fa025f87998e1cee3e6f9a4f0442',
    },
    {
      name: 'nairobi,ke',
      image:
        'https://www.safaritravelplus.com/images/wp-content/uploads/2018/08/2015_06_10_nairobi_6.jpg',
    },
  ],
});

/**
 * Specify a function to execute when the DOM is fully loaded.
 * @see{@link https://api.jquery.com/ready/}
 */
$(() => {
  weatherController
    .requestData()
    .done(() => {
      weatherController.draw();
      weatherController.attachEventListeners();
    })
    .always(() => {
      // Hide loading animation
      $('.lds-ripple').hide();
    });
});
