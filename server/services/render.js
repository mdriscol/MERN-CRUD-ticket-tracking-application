const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Get the page number from the query parameters (default to 1)
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.query.term || ""; // Get the search term from the query parameters

  // Construct the URL based on whether a search term is provided or not
  let url = `http://localhost:3000/api/requests?page=${page}&limit=`;
  if (searchTerm) {
    url += `&term=${searchTerm}`;
  }

  axios
    .get(`http://localhost:3000/api/requests?page=${page}&limit=`)
    .then(function (response) {
      // Pass pagination data to the template
      res.render("index", {
        requests: response.data, // Use 'docs' to get the array of items
        totalPages: response.data.totalPages, // Total number of pages
        currentPage: page, // Current page
        searchTerm: searchTerm, // Pass the search term to the template
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_request = (req, res) => {
  res.render("add_request");
};


exports.update_request = (req, res) => {
  axios.get("http://localhost:3000/api/requests", { params: { id: req.query.id } })
    .then(function (requestdata) {
      res.render("update_request", { request: requestdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.user = (req, res) => {
  axios.get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("user", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

//






