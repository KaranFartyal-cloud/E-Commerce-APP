const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });

    console.log(`Mongo Db connected ${conn.connection.host}`.green.underline);
  } catch (err) {
    console.log(`Error ${err.messag}`.red);
    process.exit();
  }
};

module.exports = { connectDB };
