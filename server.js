const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors')

const app = express();

const { Client } = require('pg');

const connectionString = 'postgresql://localhost:5432/floatpays'

app.use(express.static('./'))
app.use(cors({ origin: '*' }));

app.get('/api/v1/transactions', async (request, response) => {
  const client = new Client({ connectionString });
  await client.connect();
  client.query('select created_at, amount, reference from transactions', (err, res) => {
    if (err) {
      console.log(err.stack);
      response.send([]);
    } else {
      response.send(res.rows);
    }
    client.end()
  })
});

app.listen(process.env.port || 4000);
