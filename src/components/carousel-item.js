import TodayItem from './carousel-today-item';
import NextDayItem from './carousel-nextday-item';

const Item = ({ index, city, temperature, condition, low, high, nextDays }) => `
  <div class="carousel-item" data-id="${index}">
    ${TodayItem({ city, temperature, condition, low, high })}
    <div class="next-days">
        ${nextDays.map(NextDayItem).join('')}
    </div>
  </div>
`;

export default Item;
