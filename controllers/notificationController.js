const notificationModel = require("../models/notificationSchema");

const getAllNotifications = async (req, res) => {
  try {
    const notification = await notificationModel.find().exec();
    if (!notification)
      return res
        .status(404)
        .json({ message: "No notifications found", success: false });
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getNotificationsByClass = async (req, res) => {
  try {
    const std = req.body.std;
    if (!std)
      return res.status(400).json({ message: "No std sent", success: false });
    const notification = await notificationModel.find(std).exec();
    if (!notification)
      return res
        .status(404)
        .json({ message: "No notifications found", success: false });
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const postNotifications = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const notification = await notificationModel.create(data);
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const notification = await notificationModel.findByIdAndDelete(id);
    if (!notification)
      return res.status(404).json({
        message: `No notification with id ${id} found`,
        success: false,
      });
    res
      .status(201)
      .json({ message: `Notification with id ${id} deleted`, success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByClass,
  postNotifications,
  deleteNotification,
};
