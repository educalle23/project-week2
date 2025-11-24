require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const passport = require("passport");
const session = require("express-session");
// Load Passport strategies and configuration
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Perfume Shop API",
      version: "1.0.0",
      description: "REST API for perfume shop management",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
      {
        url: "https://project-week2.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

//Session and Passport Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hora
    }
  })
);

// Initialize Passport and restore authentication state, if any
app.use(passport.initialize());
app.use(passport.session());

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Expose raw swagger JSON for debugging/tools
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerDocs);
});

// Routes
app.use("/", require("./routes/indexRoutes"));
app.use("/parfums", require("./routes/parfumRoutes"));
app.use("/clients", require("./routes/clientRoutes"));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
});
