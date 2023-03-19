require("dotenv").config();

module.exports = {
  mongoURI:
    "mongodb+srv://joy:12345@cluster0.hqm0ilb.mongodb.net/?retryWrites=true&w=majority",
  jwtSecret: "backend-secret",
};
