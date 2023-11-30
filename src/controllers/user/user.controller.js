import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import { User, TransportManager, Traveler } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const allUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const users = await User.findAndCountAll({
      order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const {
      email, password, name, isTransportManager
    } = req.body;

    const reqPass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    const payload = {
      email,
      name,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
    };

    if (isTransportManager) {
      const transportManager = await TransportManager.scope('withSecretColumns').findOne({
        where: { email: email },
      });
      if (transportManager) {
        throw new Error('User already exists with same email');
      }

      const newTransportManager = await TransportManager.create(payload);

    } else {
      const traveler = await Traveler.scope('withSecretColumns').findOne({
        where: { email: email },
      });
      if (traveler) {
        throw new Error('User already exists with same email');
      }

      const newTraveler = await Traveler.create(payload);
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const {
      email, password, isTransportManager
    } = req.body;

    let user;

    if (isTransportManager) {
      user = await TransportManager.scope('withSecretColumns').findOne({
        where: { email: email },
      });
    } else {
      user = await Traveler.scope('withSecretColumns').findOne({
        where: { email: email },
      });
    }

    if (!user) {
      throw new Error('Incorrect Email Id/Password');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(password || '')
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Incorrect Email Password');
    }
    const token = jwt.sign(
      {
        user: {
          userId: isTransportManager ? user.managerID : user.travelerID,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { travelerID } = req.user;
    const traveler = await Traveler.findOne({ where: { travelerID: travelerID } });
    return successResponse(req, res, { traveler });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({
      where: { id: userId },
    });

    const reqPass = crypto
      .createHash('md5')
      .update(req.body.oldPassword)
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Old password is incorrect');
    }

    const newPass = crypto
      .createHash('md5')
      .update(req.body.newPassword)
      .digest('hex');

    await User.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
