const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');


const SendEmail = (to_name, to_email, message, from_email, user_password) => {

   const htmlEmail = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Gentle Reminder</title>
      <style>
        /* Inline CSS for styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }

        h1 {
            color: #007BFF;
        }

        p {
            font-size: 16px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
        }

        .footer p {
            color: #888;
        }
    </style>

  </head>
  <body>
      <div class="container">
          <h1>Gentle Reminder</h1>
          <p>Dear ${to_name},</p>
          <p>We hope this message finds you well.</p>
          <p>${message}</p>
          <p>Thank you for your attention to this matter.</p>
          <p>Your caretaker.</p>
          <div class="footer">
              <p>If you have any questions or need further assistance, please don't hesitate to contact us at ${from_email}.</p>
          </div>
      </div>
  </body>
  </html>
`;

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: from_email,
         pass: user_password,
      },
   });

   const mailOptions = {
      from: from_email,
      to: to_email,
      subject: `Hello ${to_name}, you have a message`,
      html: htmlEmail,
   };

   transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
         console.log(err);
      } else {
         console.log('Email sent!');
      }
   });
}


module.exports = SendEmail;