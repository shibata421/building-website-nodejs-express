const express = require('express');

const router = express.Router();

module.exports = ({ feedbackService }) => {
  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();
      return response.render('layout', {
        pageTitle:'Feedback',
        template: 'feedback',
        feedbacks
      })
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => response.send('Feedback form posted'));

  return router;
};
