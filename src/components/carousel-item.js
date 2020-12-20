const Item = ({ city, temperature, condition, low, high }) => `
  <div class="carousel-item">
    <div class="today">
        <h3 class="city">${city}</h3>
        <h5 class="condition">${condition}</h5>
        <h1 class="temperature">${temperature}°</h1>
        <h3 class="min-max">${low}°/${high}°</h3>
    </div>
  </div>
`;

export default Item;
