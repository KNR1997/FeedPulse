import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [120, "Title cannot exceed 120 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description must be at least 20 characters"],
      trim: true,
    },

    category: {
      type: String,
      enum: ["Bug", "Feature Request", "Improvement", "Other"],
      required: [true, "Category is required"],
    },

    status: {
      type: String,
      enum: ["New", "In Review", "Resolved"],
      default: "New",
    },

    submitterName: {
      type: String,
      trim: true,
    },

    submitterEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    // AI fields
    ai_category: {
      type: String,
    },

    ai_sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
    },

    ai_priority: {
      type: Number,
      min: 1,
      max: 10,
    },

    ai_summary: {
      type: String,
    },

    ai_tags: [
      {
        type: String,
      },
    ],

    ai_processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  },
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
