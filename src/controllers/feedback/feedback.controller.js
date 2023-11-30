import { Traveler, Trip, Question, Feedback, FeedbackResponse } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getPreTripFeedback = async (req, res) => {
    try {
        const questions = await Question.findAll({});
        return successResponse(req, res, questions);
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const addTripFeedback = async (req, res) => {
    const { responses } = req.body;
    const travelerID = req.user.travelerID;

    if(!Array.isArray(responses)) return errorResponse(req, res, "Send responses for questions.");

    try {
        const tripID = req.params.tripID;
        const trips = await Traveler.findOne({
            where: { travelerID: travelerID },
            include: [{
                model: Trip,
                as: "Trips",
                where: {tripID: tripID}
            }],
        });
        if(!trips) {
            throw new Error('Trip not found!');
        }

        const newFeedback = await Feedback.create({
            tripID,
            travelerID,
            feedbackDate: new Date()
        });

        const feedbackId = newFeedback.feedbackId;

        let errors = [];
        let feedbackResponses = [];

        for (const response of responses) {
            try {
                const feedbackResponse = await FeedbackResponse.create({
                    questionID: response.questionID,
                    response: response.response,
                    feedbackId: feedbackId
                });
                feedbackResponses.push(feedbackResponse);
            } catch (error) {
                errors.push(error.message);
            }
        }

        return successResponse(req, res, {feedback: newFeedback, feedbackResponses, errors},);
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const getTripFeedback = async (req, res) => {
    try {
        const tripID = req.params.tripID;
        const trips = !req.user.isTransportManager ? await Traveler.findOne({
            where: { travelerID: req.user.travelerID },
            include: [{
                model: Trip,
                as: "Trips",
                where: {tripID: tripID}
            }],
        }) : await Trip.findOne({
            where: {tripID: tripID}
        });
        if(!trips) {
            throw new Error('Trip not found!');
        }

        const feedback = await Feedback.findOne({tripID: tripID});
        const feedbackResponses = await FeedbackResponse.findAll({feedbackId: feedback.feedbackId});
        return successResponse(req, res, {feedback, feedbackResponses});
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const getAllTripFeedback = async (req, res) => {
    try {
        const tripID = req.params.tripID;
        const trips = await Traveler.findOne({
            where: { travelerID: req.user.travelerID },
            include: [{
                model: Trip,
                as: "Trips",
                where: {tripID: tripID}
            }],
        });
        if(!trips) {
            throw new Error('Trip not found!');
        }

        const feedback = await Feedback.findOne({tripID: tripID});
        const feedbackResponses = await FeedbackResponse.findAll({feedbackId: feedback.feedbackId});
        return successResponse(req, res, {feedback, feedbackResponses});
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({});
        if(!trips) {
            throw new Error('Trip not found!');
        }

        return successResponse(req, res, {trips});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}