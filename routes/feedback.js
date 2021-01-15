const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations =   [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .escape() // it makes sure there's no html or js embedded here
    .withMessage('A name is required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
  check('title')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A title is required'),
  check('message')
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage('A message is required'),
];

module.exports = ({ feedbackService }) => {
  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();

      // when the route is redirected from the post method, this will see if there are any errors
      const errors = request.session.feedback ? 
        request.session.feedback.errors : false;
      const successMessage = request.session.feedback ? 
        request.session.feedback.message : false;
      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedbacks,
        errors,
        successMessage
      });
    } catch (error) {
      return next(error);
    }
  });

  // It's necessary to validate the data that comes from the user
  // bc of express-validator, now we can validate the form
  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(), // array of errors from express-validator
        };
        return response.redirect('/feedback'); // it makes sure the user cannot just press reload to submit the form again
      }

      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thank you for your feedback',
      };
      return response.redirect('/feedback');
    } catch (error) {
      return next(error);
    }
  });

  router.post('/api', validations, async (request, response, next) => {
    try {
     const errors = validationResult(request);

     if(!errors.isEmpty()){
       return response.json({ errors: errors.array() })
     }

     const { name, email, title, message } = request.body;
     await feedbackService.addEntry(name, email, title, message);
     
     const feedback = await feedbackService.getList();
     return response.json({ feedback, successMessage: 'Thank you for your feedback' });
    } catch (error) {
      return next(error);
    }
  })
  return router;
};
