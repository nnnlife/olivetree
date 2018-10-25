const dev = process.env.NODE_ENV !== 'production';

const config = {
    SERVER_URL_PREFIX:
        dev? 'http://localhost:8080':'https://olivetree.io',
    MONGO_URL:
        dev? 'mongodb://nnnlife.iptime.org:27017/olivetree':process.env.MONGO_URL,
    SESSION_SECRET:
        dev? 'secret':process.env.SESSION_SECRET,
    GOOGLE_CLIENT_ID:
        dev? require('./auth').google.clientID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:
        dev? require('./auth').google.clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:
        dev? require('./auth').google.clientCallback:process.env.GOOGLE_CALLBACK,
}

module.exports = config;