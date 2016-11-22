var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// 路由路径配置
var index = require('./routes/index');
var accountVis = require('./routes/accountVis');
var singleChat = require('./routes/singleChat');
var socialNetwork = require('./routes/socialNetwork');
var weiboEvent = require('./routes/weiboEvent');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: 'http://127.0.0.1:3000'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// 路由配置
app.use('/weiboVis/index', index);
app.use('/weiboVis/accountVis', accountVis);
app.use('/weiboVis/singleChat', singleChat);
app.use('/weiboVis/socialNetwork', socialNetwork);
app.use('/weiboVis/weiboEvent', weiboEvent);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
