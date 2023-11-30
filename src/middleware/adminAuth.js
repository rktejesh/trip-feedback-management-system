import { errorResponse } from '../helpers';
import { TransportManager } from '../models';

const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
  let token = req.header('Authorization');

  if(!token) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }

  if (token && token.includes('Bearer'))
    token = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const transportManager = await TransportManager.scope('withSecretColumns').findOne({
      where: { email: req.user.email },
    });

    if (!transportManager) {
      return errorResponse(req, res, 'User is not found in system', 401);
    }

    const reqTransportManager = { ...transportManager.get()};
    reqTransportManager.managerID = transportManager.managerID;
    req.user = reqTransportManager;
    req.user.isTransportManager = true;
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

export default adminAuth;
