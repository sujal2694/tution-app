import { routineModel } from "../model/routineModel.js";

export const createSchedule = async (req, res) => {
  try {
    const { day, subject, startTime, endTime } = req.body;

    if (!day || !subject || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let dayDoc = await routineModel.findOne({ day });

    if (dayDoc) {
      dayDoc.items.push({ subject, startTime, endTime });
      await dayDoc.save();
    } else {
      dayDoc = await routineModel.create({
        day,
        items: [{ subject, startTime, endTime }],
      });
    }

    const routines = await routineModel.find();
    res.status(200).json({ success: true, routines });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await routineModel.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: schedules.length, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getScheduleByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const schedule = await routineModel.findOne({ day });

    if (!schedule) {
      return res.status(404).json({ success: false, message: `No schedule found for ${day}` });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await routineModel.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { day, items } = req.body;

    const schedule = await routineModel.findByIdAndUpdate(
      req.params.id,
      { day, items },
      { new: true, runValidators: true }
    );

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addItemToSchedule = async (req, res) => {
  try {
    const { subject, startTime, endTime, teacher } = req.body;

    if (!subject || !startTime || !endTime || !teacher) {
      return res.status(400).json({ success: false, message: 'All item fields are required' });
    }

    const schedule = await routineModel.findByIdAndUpdate(
      req.params.id,
      { $push: { items: { subject, startTime, endTime, teacher } } },
      { new: true, runValidators: true }
    );

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeItemFromSchedule = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const schedule = await routineModel.findByIdAndUpdate(
      id,
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { day, index } = req.body;

    if (!day || index === undefined) {
      return res.status(400).json({ success: false, message: "Day and index are required" });
    }

    const dayDoc = await routineModel.findOne({ day });

    if (!dayDoc) {
      return res.status(404).json({ success: false, message: "Day not found" });
    }

    if (index < 0 || index >= dayDoc.items.length) {
      return res.status(400).json({ success: false, message: "Invalid item index" });
    }

    dayDoc.items.splice(index, 1);
    await dayDoc.save();

    const routines = await routineModel.find();
    res.status(200).json({ success: true, routines });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
