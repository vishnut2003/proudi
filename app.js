var createError = require('http-errors');
var express = require('express');
const hbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { dbConnect } = require('./config/dbconnection');
const session = require('express-session');

var indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

var app = express();

// Connect Database
dbConnect(() => {
  console.log('DB Connected')
})

// view engine setup
app.engine('hbs', hbs.engine({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir  : [
      //  path to your partials
      path.join(__dirname, 'views', 'partials'),
  ]
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: 'HRUIEDG63%HHJF^KDHGDDJD',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: false
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
