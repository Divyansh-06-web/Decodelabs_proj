const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+ no longer needs useNewUrlParser/useUnifiedTopology,
      // but keeping options object here in case you add more later.
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    // Exit process with failure — don't let the app run without a DB
    process.exit(1);
  }
};

module.exports = connectDB;
