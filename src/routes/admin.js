import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as driverController from '../controllers/driver/driver.controller'
import * as questionController from '../controllers/question/question.controller'
import * as feedbackController from '../controllers/feedback/feedback.controller';
import * as feedbackValidator from '../controllers/feedback/feedback.validator';
import * as tripController from '../controllers/trip/trip.controller';
import * as tripvalidator from '../controllers/trip/trip.validator';
const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.get('/travelers', userController.allUsers);

//= ===============================
// Feedback Review
//= ===============================

router.get('/feedback/trips/:tripID',feedbackController.getTripFeedback );
router.get('/feedback/driver/:driverID');
router.get('/feedback/all');

//= ===============================
// Trips Review
//= ===============================

router.get('/trips/',tripController.getAllTripDetails );
router.get('/trips/:tripID');
router.get('/feedback/all');

//= ===============================
// Feedback reports
//= ===============================

// router.get('/reports/feedback/trip/:tripId');
// router.get('/reports/feedback/driver/:driverId');

//= ===============================
// Feedback form questions
//= ===============================

router.get('/questions', questionController.allQuestions);
router.post('/questions', questionController.addQuestion);
router.get('/questions/:questionID');
router.put('/questions/:questionID');
router.delete('/questions/:questionID', questionController.deleteQuestion);

//= ===============================
// Driver
//= ===============================

router.get('/drivers/:page', driverController.allDrivers);
router.post('/drivers', driverController.addDriverDetails);
router.delete('/drivers/:driverID', driverController.deleteDriver);

module.exports = router;