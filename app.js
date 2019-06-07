var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 处理 post 中间件
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const UserRoutes = require('./src/resources/users/users-route')
const routes = require('./src/resources/routes.js')

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err.stack)

    res.send({ status: err.status, message: err.message, stack: err.stack });
});

// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app;