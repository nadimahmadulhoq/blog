const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const passport = require('passport');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/admin', require('./routes/admin'));
app.get('/register', (req, res) => {
	res.render('registration');
});
app.get('/login', (req, res) => {
	res.render('login');
});
app.get('/', (req, res) => {
	res.render('index');
});

db.authenticate()
.then(() => console.log('db connected.'))
.catch((err) => console.log(err));


app.use(express.static(__dirname+ '/public'));

db.sync()
.then(restult => {
	console.log(restult)
	app.listen(3000, console.log('server running.'));
})
.catch(err => console.log(err));

// const PORT = process.env.PORT || 3000;