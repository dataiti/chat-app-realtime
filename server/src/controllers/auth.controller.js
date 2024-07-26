import ms from "ms";
import { StatusCodes } from "http-status-codes";

import UserModel from "~/models/user.model";
import { JwtProvider } from "~/providers/jwt.provider";
import { env } from "~/configs/environtment.config";
import ApiError from "~/utils/ApiError";

const login = async (req, res, next) => {
     try {
          const { email, password } = req.body;

          const findUser = await UserModel.findOne({ email });

          if (!findUser)
               throw new ApiError(StatusCodes.UNAUTHORIZED, "Incorrect Email");

          if (!(await findUser.isCorrectPassword(password)))
               throw new ApiError(
                    StatusCodes.UNAUTHORIZED,
                    "Incorrect password"
               );

          const userInfo = {
               _id: findUser._id,
               firstname: findUser.firstname,
               lastname: findUser.lastname,
               email: findUser.email,
               avatar: findUser.avatar,
               isOnline: findUser.isOnline,
          };

          const accessToken = JwtProvider.generateTokens(
               userInfo,
               env.ACCESS_TOKEN_SECRET_SIGNATURE,
               ms("14 days")
          );
          const refreshToken = JwtProvider.generateTokens(
               userInfo,
               env.REFRESH_TOKEN_SECRET_SIGNATURE,
               ms("14 days")
          );

          res.status(200).json({
               status: "success",
               message: "Login account successfully",
               accessToken,
               refreshToken,
               data: userInfo,
          });
     } catch (error) {
          next(error);
     }
};

const register = async (req, res, next) => {
     try {
          const { firstname, lastname, email, password } = req.body;

          const existingUser = await UserModel.findOne({ email });

          if (existingUser)
               throw new ApiError(StatusCodes.CONFLICT, "E-mail is being used");

          const newUser = new UserModel({
               firstname,
               lastname,
               email,
               password,
          });

          await newUser.save();

          res.status(StatusCodes.CREATED).json({
               status: "success",
               message: "Register user successfully",
          });
     } catch (error) {
          next(error);
     }
};

const logout = async (req, res, next) => {
     try {
          res.status(StatusCodes.OK).json({
               status: "success",
               message: "Logout user successfully",
          });
     } catch (error) {
          next(error);
     }
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

const refreshToken = async (req, res, next) => {
     try {
          const { refreshToken } = req.body;

          if (!refreshToken) {
               throw new ApiError(
                    StatusCodes.UNAUTHORIZED,
                    "Unauthorized! (Token not found)"
               );
          }

          const refreshTokenDecoded = JwtProvider.verifyToken(
               refreshToken,
               env.REFRESH_TOKEN_SECRET_SIGNATURE
          );

          const userInfo = {
               _id: refreshTokenDecoded._id,
               firstname: refreshTokenDecoded.firstname,
               lastname: refreshTokenDecoded.lastname,
               email: refreshTokenDecoded.email,
               avatar: refreshTokenDecoded.avatar,
               isOnline: refreshTokenDecoded.isOnline,
          };

          const accessToken = JwtProvider.generateTokens(
               userInfo,
               env.ACCESS_TOKEN_SECRET_SIGNATURE,
               "5s"
          );

          const newRefreshToken = JwtProvider.generateTokens(
               userInfo,
               env.ACCESS_TOKEN_SECRET_SIGNATURE,
               ms("14 days")
          );

          res.status(StatusCodes.OK).json({
               status: "success",
               message: "Refresh token sucessfully",
               accessToken,
               newRefreshToken,
          });
     } catch (error) {
          next(error);
     }
};

export const authController = {
     login,
     register,
     logout,
     refreshToken,
};
