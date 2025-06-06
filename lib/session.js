// lib/session.js
const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
  secret: process.env.SESSION_SECRET,         
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,               // 1 day
    httpOnly: true,                            // not available to JavaScript
    secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS
    sameSite: "lax",                           // helps protect against CSRF
  },
});
