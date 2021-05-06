const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    )
    .then(() => {
      console.log("Database connected");
    });