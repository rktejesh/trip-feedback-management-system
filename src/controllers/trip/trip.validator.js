import Joi from 'joi';

export const addTripDetails = {
    body: {
        date: Joi.date().iso().required(),
        destination: Joi.string().required(),
        driverID: Joi.number().required()
    },
};