import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "~/providers/jwt.provider";
import { env } from "~/configs/environtment.config";

const isAuthorized = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized! (Token not found)",
    });
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      accessToken,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    );

    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    if (error.message?.includes("jwt expired")) {
      return res
        .status(StatusCodes.GONE)
        .json({ message: "Need to refresh token." });
    }

    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized! Please Login." });
  }
};

export const authMiddleware = {
  isAuthorized,
};
