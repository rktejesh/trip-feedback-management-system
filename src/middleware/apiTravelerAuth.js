import { errorResponse } from '../helpers';
import { Traveler } from '../models';

const jwt = require('jsonwebtoken');

const apiTravelerAuth = async (req, res, next) => {
  let token = req.header('Authorization');

  if(!token) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }

  if (token && token.includes('Bearer'))
    token = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const traveler = await Traveler.scope('withSecretColumns').findOne({
      where: { email: req.user.email },
    });
    if (!traveler) {
      return errorResponse(req, res, 'User is not found in system', 401);
    }
    const reqTraveler = { ...traveler.get() };
    reqTraveler.travelerID = traveler.travelerID;
    req.user = reqTraveler;
    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided, try re-login',
      401,
    );
  }
};

export default apiTravelerAuth;
