import axios from 'axios';
import { Driver } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const addDriverDetails = async (req, res) => {
    const { name, licenseNumber } = req.body;
    const travelerID = req.user.travelerID;

    try {
        const driver = await Driver.create({
            name: name,
            licenseNumber: licenseNumber
        });
        return successResponse(req, res, { driver });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

export const allDrivers = async (req, res) => {
    try {
        const page = req.params.page || 1;
        const limit = 2;
        const drivers = await Driver.findAndCountAll({
            offset: (page - 1) * limit,
            limit,
        });
        return successResponse(req, res, { drivers });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};

export const deleteDriver = async (req, res) => {
    try {
        const driverID = req.params.driverID;
        const driver = await Driver.findOne({
            where: {driverID: driverID},
          });
      
          if (!driver) {
            throw new Error('Driver not found');
          }
      
          // Delete the record
          await driver.destroy();
          return successResponse(req, res, { 'message': 'Driver deleted successfully' });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};