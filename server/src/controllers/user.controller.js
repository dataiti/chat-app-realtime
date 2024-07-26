import { StatusCodes } from "http-status-codes";
import UserModel from "~/models/user.model";

const getMe = async (req, res, next) => {
  try {
    const userInfo = {
      _id: req.jwtDecoded._id,
      firstname: req.jwtDecoded.firstname,
      lastname: req.jwtDecoded.lastname,
      email: req.jwtDecoded.email,
      avatar: req.jwtDecoded.avatar,
      isOnline: req.jwtDecoded.isOnline,
    };

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Get me successfully",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

const searchUserByKeyword = async (req, res, next) => {
  const { keyword, limit = 10 } = req.query;

  try {
    const regex = new RegExp(keyword, "i");
    const users = await UserModel.find({
      $and: [
        {
          $or: [
            { firstname: { $regex: regex } },
            { lastname: { $regex: regex } },
            { email: { $regex: regex } },
          ],
        },
        {
          _id: { $ne: req.jwtDecoded._id },
        },
      ],
    })
      .select("_id firstname lastname email avatar isOnline")
      .limit(Number(limit));

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Search user is sucessfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getMe,
  searchUserByKeyword,
};
