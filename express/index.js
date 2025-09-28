const express = require('express')
var cors = require('cors')
const app = express()

const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is the back end handler of LSP JWP Web')
})

app.listen(port, () => {
  console.log(`LSP JWP runnning at http://localhost:${port}`)
})
