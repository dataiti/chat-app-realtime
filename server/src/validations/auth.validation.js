import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().min(5).max(50).required().trim().strict(),
    password: Joi.string().min(8).max(16).required().trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    firstName: Joi.string().min(2).max(50).required().trim().strict(),
    lastName: Joi.string().min(2).max(50).required().trim().strict(),
    email: Joi.string().email().min(5).max(50).required().trim().strict(),
    password: Joi.string().min(8).max(16).required().trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const authValidation = {
  login,
  register,
};
