import { StatusCodes } from "http-status-codes";

import { WHTIELIST_DOMAINS } from "~/utils/constants";
import { env } from "~/configs/environtment.config";
import ApiError from "~/utils/ApiError";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin && env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    if (WHTIELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS policy.`
      )
    );
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: true,
  credentials: true,
};
