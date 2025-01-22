const winston = require('winston');

// Create a custom format that includes timestamps and colorization
const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    // Console transport for development
    new winston.transports.Console(),
    // File transport for errors
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // File transport for all logs
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// Add request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      userIP: req.ip,
      userAgent: req.get('user-agent')
    });
  });

  next();
};

module.exports = {
  logger,
  requestLogger,
  error: logger.error.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  debug: logger.debug.bind(logger),
};