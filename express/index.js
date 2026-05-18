const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

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

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
   exposedHeaders: ['set-cookie']
}))
app.use(bodyParser.json())
app.use('/uploads', express.static('./tmp'))
app.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'JeWePe',
});

// Login API

app.post('/login', (req, res) => {
  try {
    connection.query(
      'SELECT * FROM `users` WHERE `email` = ?',
      [req.body.email],
      async function (err, results) {

        if (results.length != 0) {
          const is_password_match = await bcrypt.compare(req.body.password, results[0].password)
          
          if(!err) {
            if(is_password_match) {
              console.log("Password match");

              const token = jwt.sign({ user_id: results[0].user_id }, '67', {expiresIn: '1h'})

              res.json({message: 'Login successful', JWT: token});
            } else {
              console.log("Password not match");
              res.status(500).json({ error: 'Password not match'});
            }
          } else {
            console.log(err);
            res.send(err)
          }
        }
      }
    );
  } catch(err) {
    console.log(err);
    res.send(err)
  }
}
)

app.post('/register', async (req,res) => {
  try {

    const hashed_password = await bcrypt.hash(req.body.password,10);

    connection.query(
      'INSERT INTO `users` (username, email, password)',
      [req.body.username,req.body.email,hashed_password],
      function(err,results) {
        if (!err) {
          console.log(results);
          res.status(200).json({message: 'Admin account have been created!'})
        } else {
          console.log(err);
          res.send(err);
        }
      }
    )

  } catch(err) {
    console.log(err);
  }
})

app.get('/auth', (req,res) => {
  try {
    const token = req.headers.jwt;

    if (!token) return res.status(401).json({ message: "You arent logged in"});

    jwt.verify(token, '67', (err, user) => {
      if (err) return res.status(403).json({ message: "Your JWT is stale, login again please!"});
      res.json({ authenticated: true, user: req.user})
    })
  } catch(err) {
    console.log(err);
  }
})

// Download Image

app.get('/image', upload.any(), (req,res) => {
  let imageURL = req.query.imageURL
  const file = `tmp/` + imageURL
  res.download(file);
});

// POST Dashboard

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

app.get('/allPost', upload.any(), (req,res) => {
  try {
    connection.query(
      'SELECT * FROM `post`',
      function (err, results) {
        if(!err) {
          if (results.length == 0 || undefined) {
            res.status(404).json({message: "No Post Existed"})
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

// Catalogue Dashboard

app.post('/catalogues', upload.any(), (req,res) => {
    if (req.body.mode == 'create') {
      try {
        if (req.files[0].filename == undefined) {
          console.error('no media post:', err);
          res.status(500).json({ message: 'no media post found.' });
        }

        connection.query(
          'INSERT INTO catalogues (image, package_name, description, price) VALUES (?,?,?,?)',
          [req.files[0].filename, req.body.name_package, req.body.description_package, req.body.price_package],
          function (err, results) {
            if(!err) {
              console.log(results);
              res.status(200).json({ message: 'Package Created' });
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

app.get('/catalogues', upload.any(), (req,res) => {
  if (req.query.mode == 'read') {
    try {
      connection.query(
        'SELECT * FROM `catalogues` WHERE `package_id` = ?',
        [req.query.id_package],
        function (err, results) {
          if(!err) {
            if (results.length == 0 || undefined) {
              res.status(404).json({message: "Package not found"})
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

app.get('/allCatalogues', upload.any(), (req,res) => {
  try {
    connection.query(
      'SELECT * FROM `catalogues`',
      function (err, results) {
        if(!err) {
          if (results.length == 0 || undefined) {
            res.status(404).json({message: "No Packages Existed"})
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
})

app.put('/catalogues', upload.any(), (req,res) => {
  if (req.body.mode == 'update') {
    try {
      if (req.files[0].filename == undefined) {
        console.error('no media post:', err);
        res.status(500).json({ message: 'no media post found.' });
      }

      connection.query(
        'UPDATE catalogues SET image = ?, package_name = ?, description = ?, price = ? WHERE package_id = ?',
        [req.files[0].filename, req.body.name_package, req.body.description_package, req.body.price_package, req.body.id_package],
        function (err, results) {
          if(!err) {
            console.log(results);
            res.status(200).json({ message: 'Package Updated' });
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

app.delete('/catalogues', upload.any(), (req,res) => {
  if (req.query.mode == 'delete') {
    try {
      connection.query(
        'DELETE FROM catalogues WHERE package_id = ?',
        [req.query.id_package],
        function (err, results) {
          if(!err) {
            if (results.length == 0 || undefined) {
              res.status(404).json({message: "Package not found!"})
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

// Order Dashboard

app.post('/orders', upload.any(), (req,res) => {
  try {
    connection.query(
      'INSERT INTO `order` (package_id, name, email, message, wedding_date) VALUES (?,?,?,?,?)',
      [req.body.package, req.body.name, req.body.email, req.body.message, req.body.weddingDate],
      function (err, results) {
        if(!err) {
          console.log(results);
          res.status(200).json({ message: 'Order Created!' });
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  } catch(err) {
    console.log(err);
  }
});

app.get('/orders', upload.any(), (req,res) => {
  try {
    connection.query(
      'SELECT * FROM `order`',
      function (err, results) {
        if(!err) {
          if (results.length == 0 || undefined) {
            res.status(404).json({message: "No Orders Existed"})
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
})

app.put('/order-status', upload.any(), (req,res) => {
  try {
    connection.query(
      'UPDATE `order` SET status = "approved" WHERE order_id = ?',
      [req.body.order_id],
      function (err, results) {
        if(!err) {
          console.log(results);
          res.status(200).json({ message: 'Order Status Updated' });
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  } catch(err) {
    console.log(err);
  }
});

// index

app.get('/', (req, res) => {
  res.send('This is the back end handler of LSP JWP Web')
});

app.listen(port, () => {
  console.log(`LSP JWP runnning at http://localhost:${port}`)
});