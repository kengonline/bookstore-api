require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');

const { TYPES: { BUSINESS_ERROR } } = require('./constants/error.constant');

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/index.route'))

app.use((err, req, res, next) => {
    console.error(err);
    const { name, code, message } = err;
    const httpStatus = name === BUSINESS_ERROR ? 400 : 500;

    res.status(httpStatus).send({ code, message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))