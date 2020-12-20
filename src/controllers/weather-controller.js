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
    this.data = null;
  }

  _getLocations() {
    return this._options.locations;
  }

  _onRequestDataSuccess(...args) {
    console.log('[DONE], [requestData]', ...args);
    this.data = args.map((a, i) => new DataItem(a[0], i));
    return this.data;
  }

  _onRequestDataError(error) {
    console.error('[ERROR]', '[requestData]', error);
    return error;
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
    if (!this.data) {
      throw new Error('[ERROR] data not available!');
    }

    const dots = this.data.map((d, i) => Dot(i)).join('');
    const items = this.data.map(CarouselItem).join('');

    $('#dots').html(dots);
    $('#carousel').html(items);
  }
}
