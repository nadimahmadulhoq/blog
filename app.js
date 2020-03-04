const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use('/admin', require('./routes/admin'));
app.get('/', (req, res) => {
	res.render('index');
});


app.use(express.static(path.join(__dirname, 'public')));

// const PORT = process.env.PORT || 3000;
app.listen(3000, console.log('server running.'));