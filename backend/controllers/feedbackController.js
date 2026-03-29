import Feedback from "../models/Feedback.js";

// @desc    Create Feedback
// @route   Feedback /api/Feedbacks
export const createFeedback = async (req, res, next) => {
  try {
    const newFeedback = new Feedback(req.body);
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all Feedbacks
// @route   GET /api/Feedbacks
export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single Feedback
// @route   GET /api/Feedbacks/:id
export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update Feedback
// @route   UPDATE /api/Feedbacks/:id
export const updateFeedback = async (req, res, next) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFeedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete Feedback
// @route   DELETE /api/Feedbacks/:id
export const deleteFeedback = async (req, res, next) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
