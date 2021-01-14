// modules required
const express = require('express');
const path = require('path');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

// creates an instance of express, which is the application
const app = express();

// express applications usually listen on port 3000
const port = 3000;

// ejs doesn't need to be required. express finds it after you config
app.set('view engine', 'ejs'); // view engine is the config we want to change
app.set('views', path.join(__dirname, './views'));

// This is a middleware that allows us to use the static folder content
app.use(express.static(path.join(__dirname, './static')));
app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
