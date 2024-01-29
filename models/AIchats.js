const mongoose = require('mongoose');
const { Schema } = mongoose;

const AIchatSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  content: [{
    promptType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio'],
      default: 'text',
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: false,
    },
    video: {
      type: Object,
      required: false,
    },
    audio: {
      type: Object,
      required: false,
    },
  }]
});

module.exports = mongoose.model("AIchat", AIchatSchema);