const TodayItem = ({ city, temperature, condition, low, high }) => `
    <div class="today">
        <div class="city">${city}</div>
        <div class="condition">${condition}</div>
        <div class="temperature">${temperature}</div>
        <div class="min-max">${low}°/${high}°</div>
    </div>
`;

export default TodayItem;
