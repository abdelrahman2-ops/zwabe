import User from "../models/User.js";

export const uniqueUser = async (req, res, next) => {

  const { email } = req.body;
  const userId = req.params.id; 

  if (!email) return next(); 

  const existingUser = await User.findOne({
    email,
    _id: { $ne: userId }
  });

  if (existingUser) {
    return res.status(400).json({
      status: 'failed',
      message: "البريد الإلكتروني مستخدم من قبل"
    });
  }

  next();
}