import $ from 'jquery';
import CryptoJS from 'crypto-js';

export default class HttpClient {
  constructor(config) {
    if (!config) {
      throw new Error('[ERROR] Provide a valid HttpClient configuration!');
    }

    this._config = config;
  }

  /**
   * @todo REFACTOR THIS METHOD.
   * The example provided by Yahoo's really messy...
   * "Single Responsibility Principle" broken!
   * @param {string} location
   */
  requestForecastFor(location) {
    const url = this._config.endpoint;
    const app_id = this._config.appId;
    const consumer_key = this._config.clientId;
    const consumer_secret = this._config.clientSecret;

    const method = 'GET';
    const concat = '&';
    const query = { location, format: 'json' };
    const oauth = {
      oauth_consumer_key: consumer_key,
      oauth_nonce: Math.random().toString(36).substring(2),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
      oauth_version: '1.0',
    };

    const merged = {};
    $.extend(merged, query, oauth);

    const merged_arr = Object.keys(merged)
      .sort()
      .map(function (k) {
        return [k + '=' + encodeURIComponent(merged[k])];
      });

    const signature_base_str =
      method +
      concat +
      encodeURIComponent(url) +
      concat +
      encodeURIComponent(merged_arr.join(concat));

    const composite_key = encodeURIComponent(consumer_secret) + concat;
    const hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
    const signature = hash.toString(CryptoJS.enc.Base64);

    // Extend "oauth" object
    oauth['oauth_signature'] = signature;

    const auth_header =
      'OAuth ' +
      Object.keys(oauth)
        .map(function (k) {
          return [k + '="' + oauth[k] + '"'];
        })
        .join(',');

    return $.ajax({
      method,
      url: url + '?' + $.param(query),
      headers: {
        Authorization: auth_header,
        'X-Yahoo-App-Id': app_id,
      },
    });
  }
}
