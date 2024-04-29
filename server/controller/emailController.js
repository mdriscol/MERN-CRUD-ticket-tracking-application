// controllers/emailController.js
const emailService = require("../../emailService");
const UserModel = require("./controller_user");
const Person = require("../model/model_user");


// Function to send new request notification to all users
exports.sendNewRequestNotification = async (requestData) => {
  try {
    
    // Fetch all users from the database
    const users = await Person.find({});

    // Extract the email addresses
    const emails = users.map(user => user.email);

    // Construct email content
    const subject = "New Request";
    const message = `A new request has been submitted:\n\n${requestData}`;

    // Create request object
    const request = {
      priority: requestData.priority,
      submitter: requestData.submitter,
      assignTo: requestData.assignTo,
      status: requestData.status,
      subject: requestData.subject,
      details: requestData.details,
    };

    // Send email to each user
    for (const email of emails) {
      await emailService.sendEmail({
        recipients: email,
        subject:request.subject,
        template: "ticketSubmission", // use the 'ticketSubmission' template
        users: users, // pass users data to EJS template
        request: request, // pass request data to EJS template
      });
    }
  } catch (error) {
    console.error("Failed to send email notifications:", error);
  }
};




// //Send email assignTo
// exports.sendNewRequestNotification = async (requestData) => {
//   try {
//     // Fetch the assignTo user from the database
//     const user = await Person.findOne({ email: requestData.assignTo });

//     // Construct email content
//     const subject = "New Request";
//     const message = `A new request has been submitted:\n\n${requestData}`;

//     // Create request object
//     const request = {
//       priority: requestData.priority,
//       submitter: requestData.submitter,
//       assignTo: requestData.assignTo,
//       status: requestData.status,
//       subject: requestData.subject,
//       details: requestData.details,
//     };

   
//     await emailService.sendEmail({
//       recipients: user.email,
//       subject: request.subject,
//       template: "ticketSubmission", // use the 'ticketSubmission' template
//       user: user, // pass user data to EJS template
//       request: request, // pass request data to EJS template
//     });
//   } catch (error) {
//     console.error("Failed to send email notifications:", error);
//   }
// };