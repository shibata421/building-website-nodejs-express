// modules required
const express = require('express');
const path = require('path');

// creates an instance of express, which is the application
const app = express();

// express applications usually listen on port 3000
const port = 3000;

// ejs doenst need to be required. express finds it after you config
app.set('view engine', 'ejs'); // view engine is the config we want to change
app.set('views', path.join(__dirname, './views'));

// This is a middleware that allows us to use the static folder content
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (request, response) => {
  /* now, it'll use ejs to render the index page. 
    This code says to ejs to find index.ejs inside views/pages
    The object contains local variables that will be available 
    to the template
    */
  response.render('pages/index', { pageTitle: 'Welcome' });
});

app.get('/speakers', (request, response) => {
  response.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
