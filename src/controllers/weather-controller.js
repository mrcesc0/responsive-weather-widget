import $ from 'jquery';

import DataItem from '../models/DataItem';
import CarouselItem from '../components/carousel-item';

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
    this.data = args.map(a => new DataItem(a[0]));
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
      throw new Error('[ERROR] data not available');
    }

    $('#carousel').html(this.data.map(CarouselItem).join(''));
  }
}
