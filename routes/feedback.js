const express = require('express');

const router = express.Router();

module.exports = ({ feedbackService }) => {
  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();
      return response.json(feedback);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => response.send('Feedback form posted'));

  return router;
};
