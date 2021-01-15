const express = require('express');

const router = express.Router();

module.exports = ({ speakersService }) => {
  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
      const artworks = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artworks,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const { shortname } = request.params;
      const speaker = await speakersService.getSpeaker(shortname);
      const artworks = await speakersService.getArtworkForSpeaker(shortname);
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speaker-details',
        speaker,
        artworks,
      });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
