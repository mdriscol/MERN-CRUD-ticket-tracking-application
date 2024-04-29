const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const userController = require("../controller/controller_user");
const paginationController = require("../controller/pagination");  
const axios = require("axios");
const emailController = require('../controller/emailController');
const { sendEmail } = require("../../emailService");
const Person = require("../model/model_user");


// Add a route for "add-request"
route.get("/add-request", async (req, res) => {
  try {
    
    const usersResponse = await axios.get("http://localhost:3000/api/users");
    const users = usersResponse.data;

    // Render the "add_request" view and pass the list of users to it
    res.render("add_request", { users: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


route.get("/update-request", services.update_request);
route.post("/api/requests", controller.create);
route.get("/api/requests", controller.find);
route.put("/api/requests/:id", controller.update);
route.delete("/api/requests/:id", controller.delete);

// API Routes for users
route.get("/user", services.user);
route.post("/api/users", userController.createUser);
route.get("/api/users", userController.findUser);
route.put("/api/users/:id", userController.updateUser);
route.delete("/api/users/:id", userController.deleteUser);
route.get("/update-request", userController.fetchAllUsers);

// Render user list
route.get("/userList", userController.renderUserList);
route.get("/update-request/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await userController.fetchRequestById(requestId); // Fetch the request data

    // Add the code to fetch user data here
    const usersResponse = await axios.get("http://localhost:3000/api/users");
    const users = usersResponse.data;

    res.render("update_request", { users: users, request: request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Root Route with Pagination
route.get("/", controller.findWithPagination); // Assuming you want to use pagination on the home page

// Import necessary modules and controllers
const searchController = require("../controller/search");

// Define your route handler
route.get("/search", async (req, res) => {
    const term = req.query.term; // Extract the search term from the query parameters
    console.log("Search term received:", term); // Log the search term

    try {
        // Call the search function from the search controller
        const filteredRequests = await searchController.search(term);

        // Pagination
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter, default to 1 if not provided
        const limit = 3; // Define the number of items per page
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(filteredRequests.length / limit);

        // Check if any requests were found
        if (!filteredRequests || filteredRequests.length === 0) {
            return res.status(404).json({ message: "No requests found matching the provided criteria." });
        }

        // Log the filtered requests
        console.log("Filtered requests:", filteredRequests);

        // Render the _search_results.ejs view and pass the filtered requests to it
        res.render("_search_results", { searchResults: filteredRequests.slice(startIndex, endIndex), term, currentPage: page, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while filtering requests." });
    }
});


route.post("/add-request", async (req, res) => {
  try {
    // Save the request to the database
    await controller.create(req, res);

    // Fetch all users' emails
    const users = await Person.find({}, "email");
    console.log(`Fetched ${users.length} users`); // Log number of users fetched

    // Extract the email addresses
    const emails = users.map((user) => user.email);
    console.log(`Sending email to ${emails.length} addresses`); // Log number of emails to send

    // Pass the email addresses to the sendNewRequestNotification function
    await emailController.sendNewRequestNotification(req.body, emails);
    console.log("Email sent"); // Log when email is sent

    // // If the request is saved successfully and the email is sent, send a success response
    // res.status(200).send("Request added and email sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing request");
  }
});




module.exports = route;
