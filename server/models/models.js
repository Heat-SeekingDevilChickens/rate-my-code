const { Pool } = require('pg');

//MAIN DB: 
const PG_URI = 'postgres://dtfhwazu:cp4pNgbFI7QZny167oms8WPl5PTyabsh@chunee.db.elephantsql.com/dtfhwazu';

//TEST DB:
// const PG_URI = 'postgres://dtfhwazu:cp4pNgbFI7QZny167oms8WPl5PTyabsh@chunee.db.elephantsql.com/dtfhwazu';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);

  }
};