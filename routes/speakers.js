const express = require('express');

const router = express.Router();

module.exports = ({ speakersService }) => {
  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    const artworks = await speakersService.getAllArtwork();
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
      artworks
    });
  });

  router.get('/:shortname', async (request, response) =>{
    const speaker = await speakersService.getSpeaker(request.params.shortname)
    const artworks = await speakersService.getArtworkForSpeaker(request.params.shortname)
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speaker-details',
      speaker,
      artworks
    })
  });
  return router;
};
