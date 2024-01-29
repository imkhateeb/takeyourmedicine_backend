const schedule = require('node-schedule');
const moment = require('moment');

const Medication = require('../models/medicine');

const SendMail = require('../utils/notification/sendMail');
const from_email = process.env.NODEMAILER_USERNAME;
const user_password = process.env.NODEMAILER_PASSWORD;


async function scheduleReminders(userInput) {
  const { from, to, frequency, times, scheduleId, patientName, medicineNames, email, to_number} = userInput;
  const startDate = moment(from, 'YYYY-MM-DD');
  const endDate = moment(to, 'YYYY-MM-DD');

  // console.log("We got the schedule");
  for (let date = startDate; date <= endDate; date.add(1, 'days')) {
    for (let i = 0; i < frequency; i++) {
      const reminderTime = moment(times[i]);

      // Calculate the actual reminder date and time
      const reminderDate = date
        .hour(reminderTime.hour())
        .minute(reminderTime.minute())
        .second(reminderTime.second());

      // Determine if this is the last date and the last time for that date
      const isLastDate = date.isSame(endDate, 'day');
      const isLastTime = i === frequency - 1;

      // Schedule the reminder using node-schedule
      schedule.scheduleJob(reminderDate.toDate(), async function () {
        // Replace this with your code to send the reminder
        // You can use email, push notifications, or any other method
        if (isLastDate && isLastTime) {
          // Update the courseStatus to 'completed' and save it to the database
          await Medication.updateOne(
            { _id: scheduleId }, // Add the correct query to identify the medication in your database
            { $set: { courseStatus: 'completed' } }
          );

          console.log(`Hey ${patientName} it's a reminder for last dose of ${medicineNames} at ${reminderDate.format('YYYY-MM-DD HH:mm:ss')}. Stay healthy, Stay safe`);
          
          const message = `Hey ${patientName} it's a reminder for last dose of ${medicineNames} at ${reminderDate.format('YYYY-MM-DD HH:mm:ss')}. Stay healthy, Stay safe`

          // sending the reminder
          const to_name = patientName;
          const to_email = email;
          SendMail(to_name, to_email, message, from_email, user_password);

        } else {
          
          const to_name = patientName;
          const to_email = email;
          const message = `Hey ${patientName} it's a reminder for dose of ${medicineNames} at ${reminderDate.format('YYYY-MM-DD HH:mm:ss')}. Stay healthy, Stay safe`
          SendMail(to_name, to_email, message, from_email, user_password);

        }
      });
    }
  }
}

module.exports = scheduleReminders;
