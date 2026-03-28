import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  getPost,
} from "../controllers/postController.js";
const router = express.Router();

// Get all Posts
router.get("/", getPosts);

// Get single Post
router.get("/:id", getPost);

// Create new Post
router.post("/", createPost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
