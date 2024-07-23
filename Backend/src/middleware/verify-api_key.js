import dotenv from "dotenv";

dotenv.config();

const apiKeyMiddleware = (req, res, next) => {
  const apikey = req.headers["x-api-key"];

  if (apikey && apikey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};



export default apiKeyMiddleware;
