var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(require('morgan')('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Node running OK');
})


app.listen(8080);