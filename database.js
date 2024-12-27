const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(':memory:');

function setupDatabase() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tickers (
        name TEXT PRIMARY KEY,
        last REAL,
        buy REAL,
        sell REAL,
        volume REAL,
        base_unit TEXT
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateTickers(tickers) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO tickers (name, last, buy, sell, volume, base_unit)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  tickers.forEach(ticker => {
    stmt.run(
      ticker.name,
      ticker.last,
      ticker.buy,
      ticker.sell,
      ticker.volume,
      ticker.base_unit
    );
  });

  stmt.finalize();
}

function getTop10() {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM tickers
      ORDER BY volume DESC
      LIMIT 10
    `, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  setupDatabase,
  updateTickers,
  getTop10
};