const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

mongoose.connect(
    process.env.DBURL2,
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