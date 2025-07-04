import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 daysms 
    httpOnly: true,                 // Prevent XSS  attacks cross-site scripting attacks
    sameSite: "strict",             // Prevent CSRF attacks cross-site request forgrey attacks
    secure: process.env.NODE_ENV !== "development", // Only HTTPS in prod
  });

  return token;
};
