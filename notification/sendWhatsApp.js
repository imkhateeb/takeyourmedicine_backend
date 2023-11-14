const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendWhatsApp = (to_number, message) => {

   const sendTo = `whatsapp:+91${to_number}`
   client.messages
      .create({
         body: message,
         from: process.env.TWILIO_WHATSAPP_NO,
         to: sendTo,
      })
      .then(message => console.log(message.sid))
      .catch((error) => {
         console.log("An error message came", error);
      });
}

sendWhatsApp("9559646099", 'Hello this is a message by Khateeb');