export default class HttpClient {
  constructor(config) {
    if (!config) {
      throw new Error('[ERROR] Provide a valid HttpClient configuration!');
    }

    this._config = config;
  }
}
