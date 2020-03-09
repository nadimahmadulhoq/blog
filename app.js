const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const app = express();

require('./config/passport')(passport);

app.use(
  session({secret: 'secret', resave: true, saveUninitialized: true})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', require('./routes/public'));
app.use('/admin', require('./routes/admin'));


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