import TodayItem from './carousel-today-item';
import NextDayItem from './carousel-nextday-item';

const Item = ({
  index,
  image,
  city,
  temperature,
  condition,
  low,
  high,
  nextDays,
}) => `
  <div class="carousel-item" data-id="${index}">
    <div class="background" style="background-image: url(${image})"></div>
    ${TodayItem({ city, temperature, condition, low, high })}
    <div class="next-days">
        ${nextDays.map(NextDayItem).join('')}
    </div>
  </div>
`;

export default Item;
