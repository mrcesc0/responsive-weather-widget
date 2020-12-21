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

  _elementInViewport(el, carousel) {
    const elementOffsetLeft = el.offsetLeft;
    const carouselScrollPosition = carousel.scrollLeft;

    return elementOffsetLeft === carouselScrollPosition;
  }

  _highlightDot(id) {
    const $dot = $(`#${this._options.dotsId}`).find(`[data-id='${id}']`);
    $dot.addClass('active');
  }

  _deEmphasizeDots() {
    const $dots = $(`#${this._options.dotsId} .dot`);
    $dots.removeClass('active');
  }

  _onScroll() {
    const carousel = document.getElementById(this._options.carouselId);
    // Clear our timeout throughout the scroll
    window.clearTimeout(this._isScrolling);
    // Set a timeout to run after scrolling ends
    this._isScrolling = setTimeout(
      function () {
        const items = Array.prototype.slice.call(carousel.children);
        const current = items.find(
          function (i) {
            return this._elementInViewport(i, carousel);
          }.bind(this),
        );

        if (current) {
          this._deEmphasizeDots();
          this._highlightDot(current.dataset.id);
        }
      }.bind(this),
      50,
    );
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
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const carousel = document.getElementById(this._options.carouselId);
    carousel.addEventListener('scroll', this._onScroll.bind(this), false);
  }
}
