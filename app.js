
var debug = require('debug');
const cors = require('cors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//It is Node.js body parser middleware. 
//It parse the incoming request bodies in a middleware before your handlers,
//available under the req.body property.
var bodyParser = require('body-parser');



const config = require('./Config.js');
const mongoose  = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var apis = require('./routes/api');
var states = require('./routes/state');
var cities = require('./routes/city');

//https://adrianmejia.com/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/

var app = express();
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")

    next();
  });
  
  //require('./product.route.js')(app);

  
// view engine setup
//views = A directory or an array of directories for the application's views. 
//If an array, the views are looked up in the order they occur in the array.
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Serve static content for the app from the “public” directory in the application directory:
app.use(express.static(path.join(__dirname, 'public')));

//different routing middleware
app.use('/', routes);
app.use('/users', users);
app.use('/products', products);
app.use('/api', apis);
app.use('/states', states);
app.use('/cities', cities);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//Error-handling middleware always takes four arguments
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
