const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const passport = require('passport');
const validator = require('express-validator');

const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const toastr = require('express-toastr');


const app = express();

require('./config/passport')(passport);

// Init Toastr
app.use(cookieParser('secret'));
app.use(session({
  	secret: 'secret', 
  	saveUninitialized: true,
  	resave: true
}));
app.use(flash());
app.use(toastr());

app.use(function (req, res, next)
{
    res.locals.toasts = req.toastr.render();
    next();
});

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

// Init bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Set View Engine
app.set('view engine', 'ejs');

// Set Route Path
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