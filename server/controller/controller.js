const IMTdb = require("../model/model");


// Create and save a new request
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new request
  const request = new IMTdb({
    status: req.body.status,
    openDate: new Date(),
    submitter: req.body.submitter,
    subject: req.body.subject,
    type: req.body.type,
    url: req.body.url,
    priority: req.body.priority,
    issueType: req.body.issueType,
    issueFrom: req.body.issueFrom,
    location: req.body.location,
    name: req.body.name,
    email: req.body.email,
    impactedCourses: req.body.impactedCourses, // Add impacted courses
    userDevice: req.body.userDevice, // Add user device
    operatingSystem: req.body.operatingSystem, // Add operating system
    details: req.body.details,
    assignTo: req.body.assignTo,
    solution: req.body.solution,
    modifiedDate: new Date(),
  });

  // Save the request in the database redirect("/") to the man
  request
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// Retrieve and return all requests / Retrieve and return a single request
exports.find = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    try {
      const request = await IMTdb.findById(id);
      if (!request) {
        res.status(404).send({ message: "Not found request with id " + id });
      } else {
        res.send(request);
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error retrieving request with id " + id });
    }
  } else {
    try {
      const pipeline = [
        {
          $project: {
            status: 1,
            openDate: {
              $dateToString: {
                format: "%m-%d-%Y",
                date: "$openDate",
              },
            },
            submitter: 1,
            subject: 1,
            type:1,
            url: 1,
            priority: 1,
            issueType: 1,
            issueFrom: 1,
            location: 1,
            name: 1,
            email: 1,
            details: 1,
            assignTo: 1,
            solution: 1,
            modifiedDate:1
          },
        },
      ];

      const requests = await IMTdb.aggregate(pipeline).exec();
      res.send(requests);
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Error occurred while retrieving request information",
        });
    }
  }
};

// Update an identified request by request id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  IMTdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update request with ${id}. Maybe request not found!`,
        });
      } else {

        res.redirect("/");// Redirect to the main page after successful update;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating request information" });
    });
  
};

const mongoosePaginate = require('mongoose-paginate-v2'); // Import mongoose-paginate-v2

// Retrieve and return paginated requests
exports.findWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const options = {
      page,
      limit,
      sort: { status: 1 },
  
    };

    const paginatedRequests = await IMTdb.paginate({}, options);

    // Check if there are any results
    if (!paginatedRequests) {
      return res.status(404).json({ error: "No paginated requests found." });
    }

    // Respond with the paginated requests data
    res.render("index", {
      requests: paginatedRequests.docs, // Use 'docs' to get the array of items
      totalPages: paginatedRequests.totalPages, // Total number of pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred while paginating requests." });
  }
};




// Delete with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  IMTdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Request was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete request with id=" + id,
      });
    });
};

// Update an identified request by request id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  // Add the current date and time to req.body
  req.body.modifiedDate = new Date();

  IMTdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update request with ${id}. Maybe request not found!`,
        });
      } else {
        res.redirect("/"); // Redirect to the main page after successful update;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating request information" });
    });
};

