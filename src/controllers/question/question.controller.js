import axios from 'axios';
import { Question } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const addQuestion = async (req, res) => {
    const { content, questionType, options } = req.body;

    try {
        const question = await Question.create({
            content: content,
            questionType: questionType,
            options: options
        });
        return successResponse(req, res, { question });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

export const allQuestions = async (req, res) => {
    try {
        const page = req.params.page || 1;
        const limit = 2;
        const questions = await Question.findAndCountAll({
            offset: (page - 1) * limit,
            limit,
        });
        return successResponse(req, res, { questions });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const questionID = req.params.questionID;
        const question = await Question.findOne({
            where: { questionID: questionID },
        });

        if (!question) {
            throw new Error('Question not found');
        }

        // Delete the record
        await question.destroy();
        return successResponse(req, res, { 'message': 'Question deleted successfully' });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};