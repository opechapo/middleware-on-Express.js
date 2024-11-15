const {logEvents} = require('./logEvents');

// Logger middleware

const errorHandler = (err, req, res, next) => {
  //logEvent(message, logName);
  logEvents(`${err.name}\t${err.message}` , "errLog.txt");
  //  console.log(req.method, req.path);
  //  next();
  res.status(500).send(err.message);
    
}
module.exports = errorHandler;