import $ from 'jquery';

import DataItem from '../models/DataItem';
import CarouselItem from '../components/carousel-item';
import Dot from '../components/carousel-dot';

export default class WeatherController {
  constructor(httpClient, options) {
    if (!httpClient) {
      throw new Error('[ERROR] Provide an HttpClient instance!');
    }

    if (!options) {
      throw new Error('[ERROR] Provide a valid options object!');
    }

    this._httpClient = httpClient;
    this._options = options;
    this._data = null;
    this._touchstartX = 0;
    this._touchendX = 0;
  }

  _getLocations() {
    return this._options.locations;
  }

  _onRequestDataSuccess(...args) {
    console.log('[DONE], [requestData]', ...args);
    this._data = args.map((a, i) => new DataItem(a[0], i));
    return this._data;
  }

  _onRequestDataError(error) {
    console.error('[ERROR]', '[requestData]', error);
    return error;
  }

  _onTouchStart(event) {
    this._touchstartX = event.changedTouches[0].screenX;
  }

  _onTouchEnd(event) {
    this._touchendX = event.changedTouches[0].screenX;
    this._handleGesture();
  }

  _handleGesture() {
    if (this._touchendX < this._touchstartX) {
      console.log('Swiped left');
    }

    if (this._touchendX > this._touchstartX) {
      console.log('Swiped right');
    }
  }

  /**
   * Request data to Yahoo service
   */
  requestData() {
    const requests = this._getLocations().map(location =>
      this._httpClient.requestForecastFor(location),
    );

    return $.when
      .apply(undefined, requests)
      .then(this._onRequestDataSuccess.bind(this), this._onRequestDataError);
  }

  /**
   * Draw the html
   */
  draw() {
    if (!this._data) {
      throw new Error('[ERROR] data not available!');
    }

    const dots = this._data.map((d, i) => Dot(i)).join('');
    const items = this._data.map(CarouselItem).join('');

    $('#dots').html(dots);
    $('#carousel').html(items);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const carousel = document.getElementById('carousel');

    carousel.addEventListener(
      'touchstart',
      this._onTouchStart.bind(this),
      false,
    );

    carousel.addEventListener('touchend', this._onTouchEnd.bind(this), false);
  }
}
