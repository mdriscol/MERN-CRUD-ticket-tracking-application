const IMTdb = require("../model/model");

// Function to handle search requests
exports.search = async (term) => {
  try {
    // Find requests matching the search term
    const filteredRequests = await IMTdb.find({
      $or: [
        { status: { $regex: term, $options: "i" } },
        { submitter: { $regex: term, $options: "i" } },
        { subject: { $regex: term, $options: "i" } },
        { type: { $regex: term, $options: "i" } },
        { priority: { $regex: term, $options: "i" } },
        { issueType: { $regex: term, $options: "i" } },
        { issueFrom: { $regex: term, $options: "i" } },
        { location: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
        { name: { $regex: term, $options: "i" } },
        { impactedCourses: { $regex: term, $options: "i" } },
        { details: { $regex: term, $options: "i" } },
        { assignTo: { $regex: term, $options: "i" } },
      ],
    });

    return filteredRequests;
  } catch (error) {
    console.error(error);
    throw new Error("Error occurred while filtering requests.");
  }
};

