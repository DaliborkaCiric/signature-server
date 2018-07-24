var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/email-page');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/email-page', usersRouter);

app.post('/email-page', function(req, res) {
  console.log(req.body, 'BODY');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bukica1989@gmail.com',
            pass: 'yvdv217w'
        }
    });

    var mailOptions = {
        from: 'bukica1989@gmail.com',
        to: req.body.email,
        subject: 'Medidata signature',
        text: req.body.img
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send()
})

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
