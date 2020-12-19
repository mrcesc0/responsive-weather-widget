import $ from 'jquery';

import './styles/scss/index.scss';

import HttpClient from './shared/http-client';

/**
 * Setup Http client
 */
const httpClientConfig = {};
// eslint-disable-next-line no-unused-vars
const httpClient = new HttpClient(httpClientConfig);

/**
 * Specify a function to execute when the DOM is fully loaded.
 * @see{@link https://api.jquery.com/ready/}
 */
$.ready(() => {
  // Handler for .ready() called.
});
