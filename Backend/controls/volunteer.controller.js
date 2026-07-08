import Volunteer from '../models/volunteer.model.js';
import { errorHandler } from '../utils/error.js';

export const applyForVolunteering = async (req, res, next) => {
    try {
        const { eventName, eventDate, eventLocation, eventDescription, volunteerRole } = req.body;
        
        const newVolunteer = new Volunteer({
            userId: req.user.id,
            eventName,
            eventDate,
            eventLocation,
            eventDescription,
            volunteerRole
        });

        const savedVolunteer = await newVolunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        next(error);
    }
};

export const getUserVolunteering = async (req, res, next) => {
    try {
        const volunteers = await Volunteer.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(volunteers);
    } catch (error) {
        next(error);
    }
};

export const updateVolunteerStatus = async (req, res, next) => {
    try {
        const { volunteerId } = req.params;
        const { status } = req.body;

        const volunteer = await Volunteer.findByIdAndUpdate(
            volunteerId,
            { status },
            { new: true }
        );

        if (!volunteer) {
            return next(errorHandler(404, 'Volunteer application not found'));
        }

        res.status(200).json(volunteer);
    } catch (error) {
        next(error);
    }
};

export const deleteVolunteerApplication = async (req, res, next) => {
    try {
        const { volunteerId } = req.params;
        
        const volunteer = await Volunteer.findById(volunteerId);
        
        if (!volunteer) {
            return next(errorHandler(404, 'Volunteer application not found'));
        }

        if (volunteer.userId.toString() !== req.user.id) {
            return next(errorHandler(401, 'You can only delete your own applications'));
        }

        await Volunteer.findByIdAndDelete(volunteerId);
        res.status(200).json('Volunteer application has been deleted');
    } catch (error) {
        next(error);
    }
}; 