import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import auth from "./routes/auth.js";
import posts from "./routes/posts.js";
import feedbacks from "./routes/feedbacks.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger.js";

const port = process.env.PORT || 8000;
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/feedbacks", feedbacks);

// Error handler
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
