const express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'JeWePe',
});

app.get('/', (req, res) => {
  res.send('This is the back end handler of LSP JWP Web')
});

app.post('/login', (req, res) => {
    try {
      connection.query(
        'SELECT * FROM `users` WHERE `email` = ? AND `password` = ?',
        [req.body.email, req.body.password],
        function (err, results) {
          if(!err) {
            if (results.length == 0 || undefined) {
              res.send(false)
            } else {
              res.send(true)
            }
          } else {
            console.log(err);
            res.send(err)
          }
        }
      );
    } catch(err) {
      console.log(err);
    }
  }
)

app.listen(port, () => {
  console.log(`LSP JWP runnning at http://localhost:${port}`)
});