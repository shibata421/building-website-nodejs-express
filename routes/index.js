const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

// express.Router allows the application to listen to specific routes
const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const topSpeakers = await speakersService.getList();
    const artworks = await speakersService.getAllArtwork();

    /* now, it'll use ejs to render the index page. 
    This code says to ejs to find index.ejs inside layout
    The object contains local variables that will be available 
    to the template
    */
    response.render('layout', {
      pageTitle: 'Welcome',
      template: 'index',
      topSpeakers,
      artworks
    });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};

/* conventionally, we would export using module.exports = router
However, this way allows us to pass arguments to the router
*/
