// server.js
require("dotenv").config();
const express      = require("express");
const next         = require("next");
const helmet       = require("helmet");
const rateLimit    = require("express-rate-limit");
const sanitizeBody = require("mongo-sanitize"); 
const session      = require("./lib/session");
const connectDB    = require("./lib/db");

const dev     = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle  = appNext.getRequestHandler();

(async () => {
  // 1) Connect to MongoDB
  await connectDB();

  // 2) Prepare Next.js 
  await appNext.prepare();

  // 3) Create Express
  const app = express();

  //
  // 4a) (Optional) CORS in prod only
  //
  if (!dev) {
    const cors = require("cors");
    app.use(
      cors({
        origin: ["https://www.express-postals.com"], 
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
      })
    );
  }

  //
  // 4b) Helmet → sets some safe HTTP headers
  //      We disable CSP here because Next.js has its own <Head> handling.
  //
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  //
  // 4c) Rate Limiter → throttle abusive requests
  //
  const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 200,            // max 200 requests per IP per minute
    message: { error: "Too many requests, please try again in a minute." },
  });
  app.use(globalLimiter);

  //
  // 4d) Session handling (cookie flags set in ./lib/session.js)
  //
  app.use(session);

  //
  // 5) “/api” routes: parse JSON, sanitize only req.body, then XSS-clean
  //
  app.use(
  "/api",
  express.json({ limit: "10kb" }),
  (req, res, next) => {
    // apply mongo-sanitize to req.body only:
    if (req.body && typeof req.body === "object") {
      req.body = sanitizeBody(req.body);
    }
    next();
  },
  // Manually strip out any HTML tags in req.body (e.g. using a simple utility)
  (req, res, next) => {
    if (req.body && typeof req.body === "object") {
      // Recursively walk req.body and remove any `<script>` tags, etc.
      const stripHtml = str => String(str).replace(/<[^>]*>?/gm, "");
      const scrub = o => {
        for (let k in o) {
          if (typeof o[k] === "string") {
            o[k] = stripHtml(o[k]);
          } else if (typeof o[k] === "object" && o[k] !== null) {
            scrub(o[k]);
          }
        }
      };
      scrub(req.body);
    }
    next();
  }
);


  //
  // 6) Mount all API routers
  //
  app.use("/api/setup-admin", require("./routes/setupAdmin"));
  app.use("/api/auth",         require("./routes/auth"));
  app.use("/api/users",        require("./routes/users"));
  app.use("/api/shipments",    require("./routes/shipments"));
  app.use("/api/contact", require("./routes/contact"));

  //
  // 7) For ∗everything else∗ (all “/*”), Next.js will serve pages, static files, etc.
  //
  app.use((req, res) => {
    return handle(req, res);
  });

  //
  // 8) Catch-all error handler (in case any route calls next(err))
  //
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "An unexpected error occurred.",
    });
  });

  //
  // 9) Start listening
  //
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
