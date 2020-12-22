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
    this._isScrolling = null;
  }

  _getLocations() {
    return this._options.locations;
  }

  _onRequestDataSuccess(...args) {
    console.log('[DONE], [requestData]', ...args);
    const locations = this._getLocations();
    this._data = args.map((a, index) => {
      const res = a[0];
      const image = locations[index].image;
      return new DataItem(res, index, image);
    });
    return this._data;
  }

  _onRequestDataError(error) {
    console.error('[ERROR]', '[requestData]', error);
    return error;
  }

  _elementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const elementOffsetLeft = rect.left;
    const pageXOffset = window.pageXOffset;

    return elementOffsetLeft === pageXOffset;
  }

  _highlightDot(id) {
    const $dot = $(`#${this._options.dotsId}`).find(`[data-id='${id}']`);
    $dot.addClass('active');
  }

  _deEmphasizeDots() {
    const $dots = $(`#${this._options.dotsId} .dot`);
    $dots.removeClass('active');
  }

  _getCurrentElementInViewport() {
    const carousel = document.getElementById(this._options.carouselId);
    const items = Array.prototype.slice.call(carousel.children);
    return items.find(
      function (i) {
        return this._elementInViewport(i);
      }.bind(this),
    );
  }

  _onScroll() {
    // Clear our timeout throughout the scroll
    window.clearTimeout(this._isScrolling);
    // Set a timeout to run after scrolling ends
    this._isScrolling = setTimeout(
      this._setCurrentActiveElement.bind(this),
      50,
    );
  }

  _setCurrentActiveElement() {
    const current = this._getCurrentElementInViewport();
    if (current) {
      this._deEmphasizeDots();
      this._highlightDot(current.dataset.id);
    }
  }

  /**
   * Request data to Yahoo service
   */
  requestData() {
    const requests = this._getLocations().map(location =>
      this._httpClient.requestForecastFor(location.name),
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

    const dots = this._data.map(Dot).join('');
    const items = this._data.map(CarouselItem).join('');

    $(`#${this._options.dotsId}`).html(dots);
    $(`#${this._options.carouselId}`).html(items);

    this._setCurrentActiveElement();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const carousel = document.getElementById(this._options.carouselId);
    carousel.addEventListener('scroll', this._onScroll.bind(this), false);
    carousel.addEventListener('touchmove', this._onScroll.bind(this), false); // Mobile
  }
}
