export default class DataItem {
  constructor(data, index) {
    const { location, current_observation, forecasts } = data;

    this.index = index;
    this.city = location.city;
    this.temperature = current_observation.condition.temperature;
    this.condition = current_observation.condition.text;
    this.low = forecasts[0].low;
    this.high = forecasts[0].high;
    this.nextDays = forecasts.slice(1, 8).map(f => ({
      day: f.day,
      low: f.low,
      high: f.high,
    }));
  }
}
