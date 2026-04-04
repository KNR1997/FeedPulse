import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  updateFeedback,
  retriggerFeedbackAnalysis,
  getFeedbackAnalytics,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/Feedbacks:
 *   post:
 *     summary: Create a new feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreate'
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackResponse'
 *       400:
 *         description: Validation error
 */
router.post("/", createFeedback);

/**
 * @swagger
 * /api/Feedbacks:
 *   get:
 *     summary: Get paginated feedbacks
 *     tags: [Feedback]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FeedbackResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Not authorized, no token
 */
router.get("/", protect, getFeedbacks);

/**
 * @swagger
 * /api/Feedbacks/analytics:
 *   get:
 *     summary: Get feedback analytics
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *      401:
 *         description: Not authorized, no token
 */
router.get("/analytics", protect, getFeedbackAnalytics);

/**
 * @swagger
 * /api/Feedbacks/{id}:
 *   get:
 *     summary: Get a single feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackResponse'
 *       401:
 *          description: Not authorized, no token
 *       404:
 *         description: Feedback not found
 */
router.get("/:id", protect, getFeedback);

/**
 * @swagger
 * /api/Feedbacks/{id}:
 *   put:
 *     summary: Update a feedback
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreate'
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackResponse'
 *       401: 
 *         description: Not authorized, no token
 *       404:
 *         description: Feedback not found
 */
router.put("/:id", protect, updateFeedback);

/**
 * @swagger
 * /api/Feedbacks/{id}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       401:
 *         description: Not authorized, no token
 *       404:
 *         description: Feedback not found
 */
router.delete("/:id", protect, deleteFeedback);

/**
 * @swagger
 * /api/Feedbacks/{id}/analyze:
 *   post:
 *     summary: Re-trigger feedback analysis
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback analysis triggered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackResponse'
 *      401:
 *         description: Not authorized, no token
 *       404:
 *         description: Feedback not found
 */
router.post("/:id/analyze", protect, retriggerFeedbackAnalysis);

export default router;
