import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as tripController from '../controllers/trip/trip.controller';
import * as tripvalidator from '../controllers/trip/trip.validator';
import * as feedbackController from '../controllers/feedback/feedback.controller';
import * as feedbackValidator from '../controllers/feedback/feedback.validator';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/me', userController.profile);
router.post(
  '/changePassword',
  validate(userValidator.changePassword),
  userController.changePassword,
);

//= ===============================
// Trips
//= ===============================
router.get('/trips', tripController.getAllTripDetails);
router.post('/trips', validate(tripvalidator.addTripDetails), tripController.addTripDetails);
router.get('/trips/:tripID', tripController.getTripDetails);
router.put('/trips/:tripID');
router.delete('/trips/:tripID', tripController.deleteTripDetails);

//= ===============================
// Feedback Response
//= ===============================
router.get('/feedback/', feedbackController.getPreTripFeedback);
router.get('/feedback/:tripID', feedbackController.getTripFeedback);
router.post('/feedback/:tripID', feedbackController.addTripFeedback);

module.exports = router;
