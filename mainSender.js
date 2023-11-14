const dotenv = require('dotenv');
dotenv.config();

const from_email = process.env.NODEMAILER_USERNAME;
const user_password = process.env.NODEMAILER_PASSWORD;

const SendEmail = require('./notification/sendReminder');
// const SendSMS = require('./notification/sendSMS');


const SendToAll = (patientName, email, message, to_number) => {
        const to_name = patientName;
        const to_email = email;
        SendEmail(to_name, to_email, message, from_email, user_password);
        // SendSMS(to_number, message);
}

module.exports = SendToAll;