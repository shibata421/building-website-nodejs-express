const express = require('express');

const router = express.Router();

module.exports = ({ feedbackService }) => {
  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    return response.json(feedback);
  });

  router.post('/', (request, response) => response.send('Feedback form posted'));

  return router;
};
