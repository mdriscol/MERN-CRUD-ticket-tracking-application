// testEmailService.js

const emailService = require("./emailService");
const { sendEmail } = require("./emailService");

const testEmail = async () => {
  const options = {
    recipients: "meihuadriscoll@gmail.com", // replace with your email address
    subject: "Test Email",
    data: {
      // data to pass to the EJS template
      message: "This is a test email",
      // add more data as needed
    },
  };

  await emailService.sendEmail(options);
};

const options = {
    recipients: 'meihuadriscoll@gmail.com',
    subject: 'Ticket Submission',
    data: {
        request: {
            status: 'Open',
            submitter: 'John Doe',
            subject: 'Issue with application',
            type: 'Bug',
            // include any other properties that you're trying to access in the template
        },
        // include any other data that you're passing to the template
    },
    // include any other options that you're passing to sendEmail
};

sendEmail(options);


