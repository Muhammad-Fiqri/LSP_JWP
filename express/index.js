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
    res.send(err)
  }
}
)

app.get('/image', upload.any(), (req,res) => {
  let imageURL = req.query.imageURL
  const file = `tmp/` + imageURL
  res.download(file);
});

app.get('/post', upload.any(), (req,res) => {
  if (req.query.mode == 'read') {
    try {
      connection.query(
        'SELECT * FROM `post` WHERE `id_post` = ?',
        [req.query.id_post],
        function (err, results) {
          if(!err) {
            if (results.length == 0 || undefined) {
              res.status(404).json({message: "Post not found"})
            } else {
              res.status(200).json(results)
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
})

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
              res.status(200).json({ message: 'Post Created' });
            } else {
              console.log(err);
              res.send(err);
            }
          }
        );
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
});

app.put('/post', upload.any(), (req,res) => {
  if (req.body.mode == 'update') {
    try {
      if (req.files[0].filename == undefined) {
        console.error('no media post:', err);
        res.status(500).json({ message: 'no media post found.' });
      }

      connection.query(
        'UPDATE post SET title = ?, image = ?, description = ? WHERE id_post = ?',
        [req.body.title_post, req.files[0].filename, req.body.content_post, req.body.id_post],
        function (err, results) {
          if(!err) {
            console.log(results);
            res.status(200).json({ message: 'Post Updated' });
          } else {
            console.log(err);
            res.send(err);
          }
        }
      );
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
});

app.delete('/post', upload.any(), (req,res) => {
  if (req.query.mode == 'delete') {
    try {
      connection.query(
        'DELETE FROM post WHERE id_post = ?',
        [req.query.id_post],
        function (err, results) {
          if(!err) {
            if (results.length == 0 || undefined) {
              res.status(404).json({message: "Post not found!"})
            } else {
              res.status(200).json(results)
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
});

app.get('/', (req, res) => {
  res.send('This is the back end handler of LSP JWP Web')
});

app.listen(port, () => {
  console.log(`LSP JWP runnning at http://localhost:${port}`)
});