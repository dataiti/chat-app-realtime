import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "~/providers/jwt.provider";
import { env } from "~/configs/environtment.config";

const isAuthorized = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized! (Token not found)",
    });
  }

  try {
    const accessTokenDecoded = JwtProvider.verifyToken(
      accessToken,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    );

    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    if (error.message?.includes("jwt expired")) {
      return res
        .status(StatusCodes.GONE)
        .json({ message: "Need to access token." });
    }

    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized! Please Login." });
  }
};

export const authMiddleware = {
  isAuthorized,
};
