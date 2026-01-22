export const restrictPasswordUpdate = (req, res, next) => {
  if (req.body.password) {
    return res.status(400).json({
      status: 'failed',
      message: "لا يمكن تحديث كلمة المرور من هذا المسار"
    });
  }
  next();
};