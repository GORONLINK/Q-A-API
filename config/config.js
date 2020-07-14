process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.LOCALE = process.env.LOCALE || 'es-ES';

// URL DE API
process.env.HOST = process.env.HOST || `http://localhost:${process.env.PORT}`;


// DATABASE
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_USER = process.env.DB_USER || '';
process.env.DB_PASS = process.env.DB_PASS || '';
process.env.DB_NAME = process.env.DB_NAME || 'node-graphql';
process.env.DB_PORT = process.env.DB_PORT || 27017;
process.env.DB_PROD_URL = process.env.DB_PROD_URL || 'mongodb://localhost:27017/node-graphql';