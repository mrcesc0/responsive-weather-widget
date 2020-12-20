const NextDayItem = ({ day, low, high }) => `
  <div class="next-day-item">
    <div class="day">${day.toUpperCase()}</div>
    <div class="min-max">${low}°/${high}°</div>
  </div>
`;

export default NextDayItem;
