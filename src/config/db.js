const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'decoding',
  password: 'lele123',
  port: 5432,
});
pool.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});
module.exports = { pool };
