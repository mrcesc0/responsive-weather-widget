import $ from 'jquery';

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

  requestData() {
    const requests = this._getLocations().map(location =>
      this._httpClient.requestForecastFor(location),
    );

    return $.when.apply(undefined, requests).then(
      function (...args) {
        console.log('[DONE], [requestData]', ...args);
        this.data = args.map(a => a[0]);
        return this.data;
      }.bind(this),
      error => {
        console.error('[ERROR]', '[requestData]', error);
        return error;
      },
    );
  }

  draw() {
    console.log('I CAN DRAW NOW');
  }
}
