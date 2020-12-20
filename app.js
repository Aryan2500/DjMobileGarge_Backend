var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


var logger = require('morgan');
var body_parser = require('body-parser')
require('./config/db') //DATABASE Connection
const getRouter = require('./routes/routesInitializer');
const fileupload = require('express-fileupload');
const getRoutes = require('./routes/routesInitializer');
var app = express();
app.use(body_parser.json())
 


//File upload setup
app.use(fileupload({
   limits:{filesize:100},
   abortOnLimit: true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set body-parser

app.use(logger('dev'));
 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', getRouter.indexRouter);
app.use('/user', getRouter.userRouter);
app.use('/products' , getRouter.productRouter)
app.use('/appointment' , getRouter.appointmentRouter)
app.use('/admin' , getRoutes.adminRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.json("not found")
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
