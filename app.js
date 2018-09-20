const express = require('express');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');
const index = require('./routes/index');
const details = require('./routes/details');

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const port = process.env.PORT || '3000';

const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', details);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  logger.info(`Running on port ${port}`);
});
