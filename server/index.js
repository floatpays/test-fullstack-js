const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const pino = require('express-pino-logger')();

const app = express();

const { Client } = require('pg');

const connectionString = 'postgresql://localhost:5432/floatpays'


app.use(express.static('./'))
app.use(cors({ origin: '*' }));
app.use(pino);
app.use(express.json());

app.post('/api/v1/transactions', async (request, response) => {
  const client = new Client({ connectionString });
  await client.connect();

  const reference = crypto.randomUUID();

  const { amount, description } = request.body;

  client.query('insert into transactions(reference, amount, description) values($1::text, $2::numeric, $3::text)', [reference, amount, description], (err, res) => {
    if (err) {
      console.log(err.stack);
      response.send([]);
    } else {
      response.send(res.rows);
    }
    client.end()
  })
});

app.get('/api/v1/transactions', async (request, response) => {
  const client = new Client({ connectionString });
  await client.connect();
  client.query('select created_at, amount, reference, description from transactions', (err, res) => {
    if (err) {
      console.log(err.stack);
      response.json([]);
    } else {
      response.json(res.rows);
    }
    client.end()
  })
});

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});


// Delete by passing "?id=" in the querystring.
// Returns true on success and false on failure.
app.delete('/api/v1/transactions', async (request, response) => {

  const client = new Client({ connectionString });
  await client.connect();

  const { id } = request.query;

  client.query('delete from transactions where id = $1::numeric', [id], (err, res) => {
    if (err) {
      console.log(err.stack);
      response.send(false);
    } else {
      response.send(true);
    }
    client.end()
  })
});
