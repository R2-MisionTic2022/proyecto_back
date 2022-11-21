var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require("./config/database"); // para declarar el proceso de conexion a la bd
var auth = require('./auth/main_auth'); // declarar variable para proceso de atenticación

var cors = require('cors');

var empleadosRouter = require('./routes/empleados.router');
var noviosRouter = require('./routes/novios.router');
var usuariosRouter = require('./routes/usuarios.router');
const { application } = require('express');


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// mongoconection aqui vamos a hacer// al iniciar el npm nos indica que hubo conexion 304
database.mongoConnect();

app.use('/usuarios', usuariosRouter);
app.use(auth);

//router
app.use('/empleados', empleadosRouter);
app.use('/novios', noviosRouter);

 

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
