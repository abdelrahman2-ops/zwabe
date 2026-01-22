import Pixel from "../models/Pixel.js";

export const upsertTrackingId = async (req, res) => {
  try {
    const { platform, pixelId } = req.body;
    if (!platform || !pixelId)
      return res.status(400).json({ message: 'Platform and pixelId are required' });

    const tracking = await Pixel.findOneAndUpdate(
      { platform },
      { pixelId },
      { upsert: true, new: true } // create if not exists
    );

    res.status(200).json(tracking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllTrackingIds = async (req, res) => {
  try {
    const configs = await Pixel.find({});
    const formatted = configs.reduce((acc, item) => {
      acc[item.platform] = item.pixelId;
      return acc;
    }, {});
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
