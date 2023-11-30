import axios from 'axios';
import { Traveler, Trip, Question, Feedback, FeedbackResponse } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAllTripDetails = async (req, res) => {
    try {
        const page = req.params.page || 1;
        const limit = 5;
        const trips = await Traveler.findOne({
            where: { travelerID: req.user.travelerID },
            include: [{
                model: Trip,
                as: "Trips"
            }],
            // order: [['date', 'DESC']],
            offset: (page - 1) * limit,
            limit,
        });
        if(!trips) {
            throw new Error('Trips not found!');
        }
        return successResponse(req, res, {trips});
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const addTripDetails = async (req, res) => {
    const { date, destination, driverID } = req.body;
    const travelerID = req.user.travelerID;

    try {
        const traveler = await Traveler.findByPk(travelerID);
        if(!traveler) {
            throw new Error('User not found!');
        }

        const newDate = new Date(date);

        const newTrip = await Trip.create({
            driverID: driverID,
            date: newDate,
            destination: destination,
            travelerID: travelerID
        });
        return successResponse(req, res, {newTrip});
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const getTripDetails = async (req, res) => {
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
            throw new Error('Trips not found!');
        }
        return successResponse(req, res, {trips});
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}

export const deleteTripDetails = async (req, res) => {
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
            throw new Error('Trips not found!');
        }
        await trips.destroy();
        return successResponse(req, res, "Trip has been successfully deleted");
    } catch (error) {   
        return errorResponse(req, res, error.message);
    }
}