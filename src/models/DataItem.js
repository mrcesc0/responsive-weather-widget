export default class DataItem {
  constructor(data) {
    const { location, current_observation, forecasts } = data;

    this.city = location.city;
    this.temperature = current_observation.condition.temperature;
    this.condition = current_observation.condition.text;
    this.low = forecasts[0].low;
    this.high = forecasts[0].high;
  }
}
