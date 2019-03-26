require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/index.route'))

app.use((err, req, res, next) => {
    console.error(err);
    const { code, httpStatus, message } = err;

    res.status(httpStatus).send({ code, message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))