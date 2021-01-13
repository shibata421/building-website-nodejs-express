// requires express
const express = require('express');

// creates an instance of express, which is the application
const app = express();

// express applications usually listen on port 3000
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello Express :)');
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});