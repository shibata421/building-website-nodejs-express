const express = require('express');

const router = express.Router();

module.exports = ({ speakersService }) => {
  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    return response.json(speakers);
  });

  router.get('/:shortname', (request, response) =>
    response.send(`Detail page of ${request.params.shortname}`)
  );
  return router;
};
