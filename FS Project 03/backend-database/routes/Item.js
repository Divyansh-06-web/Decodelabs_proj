const mongoose = require('mongoose');

// This schema is your "digital vault" blueprint (Pillar 1: The Blueprint)
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // enforces distinctness at the schema level
      lowercase: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('Item', itemSchema);
