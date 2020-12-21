const Dot = ({ index }) => `
    <div class="dot ${index === 0 ? 'active' : ''}" data-id="${index}"></div>
`;

export default Dot;
