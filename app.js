const express = require('express');
const app = express();
const UserRouter = require('./routers/user.router');
const TransactionRouter = require('./routers/transaction.router');
const GCPRouter = require('./routers/gcp.router');

const ErrorHandler = require('./error');
const multer = require('multer');
const bodyParser = require('body-parser');

require('./config/db')();


const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 5 * 1024 * 1024,
    },
});

app.use(multerMid.single('file'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', UserRouter);
app.use('/', TransactionRouter);
app.use('/', GCPRouter);


app.use((req, res, next) => {
    const err = new Error('No Route Found..!!!');
    err.status = 404;
    next(err);
})

app.use(ErrorHandler.errorHandler);

module.exports = app;