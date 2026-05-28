const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {

    // Get token from headers
    const authHeader = req.headers.authorization;


    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }


    // Format:
    // Bearer TOKEN

    const token = authHeader.split(" ")[1];


    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Attach user data to request
    req.user = decoded;


    // Move to next middleware/controller
    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

module.exports = authMiddleware;