import swaggerJsdoc from "swagger-jsdoc";
const port = process.env.PORT || 8000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Feedpulse API",
      version: "1.0.0",
      description: "API documentation for my Express.js application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "user@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Login successful",
            },
            data: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  example: "64f8a0b3f2f8e3a1c2d1e7",
                },
                name: {
                  type: "string",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  example: "user@example.com",
                },
                token: {
                  type: "string",
                  example: "jwt_token_here",
                },
              },
            },
          },
        },

        FeedbackCreate: {
          type: "object",
          required: ["title", "message"],
          properties: {
            title: {
              type: "string",
              example: "App Feedback",
            },
            message: {
              type: "string",
              example: "App works great but needs dark mode",
            },
          },
        },

        FeedbackUpdate: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              example: "Resolved",
            },
          },
        },

        FeedbackResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "64f8a0b3f2f8e3a1c2d1e7",
            },
            title: {
              type: "string",
              example: "App Feedback",
            },
            description: {
              type: "string",
              example:
                "Initial admin needs to be seed or there should be register option.",
            },
            category: {
              type: "string",
              example: "Feature Request",
            },
            status: {
              type: "string",
              example: "New",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            ai_processed: {
              type: "boolean",
              example: "true",
            },
            ai_category: {
              type: "string",
              example: "positive",
            },
            ai_sentiment: {
              type: "string",
              example: "Neutral",
            },
            ai_priority: {
              type: "number",
              example: 8,
            },
            ai_summary: {
              type: "string",
              example:
                "The user is requesting a method to create the initial admin account, either through database seeding or a registration flow, to ensure system accessibility after installation.",
            },
          },
        },

        UpdateFeedbackResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "64f8a0b3f2f8e3a1c2d1e7",
            },
            status: {
              type: "string",
              example: "New",
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js", "./controllers/*.js"],
};

const specs = swaggerJsdoc(options);
export default specs;
