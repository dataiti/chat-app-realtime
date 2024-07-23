import ms from "ms";
import { StatusCodes } from "http-status-codes";

import User from "~/models/user.model";
import { JwtProvider } from "~/providers/jwt.provider";
import { env } from "~/configs/environtment.config";
import ApiError from "~/utils/ApiError";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser)
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Incorrect Email");

    if (!(await findUser.isCorrectPassword(password)))
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Incorrect password");

    const { password: userPassword, ...others } = findUser._doc;

    const accessToken = JwtProvider.generateTokens(
      others,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      "5s"
    );
    const refreshToken = JwtProvider.generateTokens(
      others,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      ms("14 days")
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: ms("14 days"),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: ms("14 days"),
    });

    res.status(200).json({
      success: true,
      message: "Login account successfully",
      accessToken,
      refreshToken,
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      throw new ApiError(StatusCodes.CONFLICT, "E-mail is being used");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Register user successfully",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(StatusCodes.OK).json({
      success: true,
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
    const refreshToken = req.cookies?.refreshToken;

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

    const userInfo = {};

    const accessToken = JwtProvider.generateTokens(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      "1h"
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("14 days"),
    });

    res.status(StatusCodes.OK).json({
      message: "Refresh token sucessfully",
      accessToken,
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
