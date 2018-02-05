const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
var db = require('./db');

app.use(require('method-override')('_method'));
app.use(bodyParser.urlencoded({ extended: true })); // HTML form submits
// app.use(bodyParser.json()); // AJAX form submits
app.set('view engine', 'html'); // go to .html pages
app.engine('html', nunjucks.render); // nunjucks to handle
nunjucks.configure('views', { noCache: true }); // by default looks in /views/
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

db.sync()
  .then(() => db.seed());

/* WHY ISN'T app.use WORKING?! */
// app.use('/users', require('./routes/users'));
app.get('*', require('./routes/users'));
app.post('*', require('./routes/users'));
app.delete('*', require('./routes/users'));

app.use((req, res, next) => {
  res.status(400);
  res.render('error', { title: '404: File Not Found' });
});

app.listen(port, () => {
  console.log(`visit http://localhost:${port}`);
});

