// configuring environment variables
const dotenv = require('dotenv');
dotenv.config();

// importing mongoose for object modelling for nodejs
const mongoose = require('mongoose');

// URI for connecting with the mongoDB server
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.w53zo0n.mongodb.net/takeyourmedicine`

// function for connecting with the mongoDB server
const connectDB = async () => {
   try {
      await mongoose.connect(mongoURI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log("Database connected");
      return { success: true }
   } catch (error) {
      return { success: false }
   }
}

module.exports = connectDB;