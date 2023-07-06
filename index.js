const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/router')

app.use(express.static('client'));
app.set('view engine', 'ejs')
app.set('views', 'client/views')

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})