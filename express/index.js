const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
})
const upload = multer({ storage: storage })
const fs = require('fs');

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'JeWePe',
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

app.post('/post', upload.any(), (req,res) => {
    if (req.body.mode == 'create') {
      try {
        if (req.files[0].filename == undefined) {
          console.error('no media post:', err);
          res.status(500).json({ message: 'no media post found.' });
        }

        connection.query(
          'INSERT INTO post (title, image, description) VALUES (?,?,?)',
          [req.body.title_post, req.files[0].filename, req.body.content_post],
          function (err, results) {
            if(!err) {
              console.log(results);
            } else {
              console.log(err);
              res.send(err);
            }
          }
        );

        res.status(200).json({ message: 'Post Created' });
      } catch(err) {
        console.log(err);
        console.log(req.files)

        const filename = req.files[0].filename;
        const filePath = `./tmp/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            res.status(500).json({ message: 'Error deleting file.' });
          }
          res.status(200).json({ message: 'File deleted successfully.' });
        });
      }
    }

    if (req.body.mode == 'read') {

    }
});

app.get('/', (req, res) => {
  res.send('This is the back end handler of LSP JWP Web')
});

app.listen(port, () => {
  console.log(`LSP JWP runnning at http://localhost:${port}`)
});