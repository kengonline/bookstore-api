const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/index.route'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))