const axios = require('axios');
const { updateTickers } = require('./database');

async function fetchWazirxData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data)
      .map(ticker => ({
        name: ticker.name,
        last: parseFloat(ticker.last),
        buy: parseFloat(ticker.buy),
        sell: parseFloat(ticker.sell),
        volume: parseFloat(ticker.volume),
        base_unit: ticker.base_unit
      }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);

    updateTickers(tickers);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function startDataFetching() {
  fetchWazirxData();
  setInterval(fetchWazirxData, 1000 * 60); // Fetch every minute
}

module.exports = {
  startDataFetching
};