require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { TYPES } = require('./constants/error.constant')
const ErrorCode = require('./assets/error_code.json')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(require('./routes/index.route'))

app.use((err, req, res, next) => {
    console.error(err);
    const { code, httpStatus, message, name } = err;

    const errorClass = Object.keys(TYPES).find(key => TYPES[key] === name);
    if (errorClass === undefined) {
        res.status(500).send(ErrorCode.SYSTEM_500);
    } else {
        res.status(httpStatus).send({ code, message });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))