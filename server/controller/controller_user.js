const Userdb = require("../model/model_user");
const { user } = require("../services/render");

// Create and save a new user
exports.createUser = (req, res) => {
  const { userID,fullName, position, title, isAdmin, username, email } = req.body;

  const newUser = new Userdb({
    userID,
    fullName,
    position,
    title,
    isAdmin,
    username,
    email,
  });

  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Retrieve and return all users / Retrieve and return a single user
exports.findUser = async (req, res) => {
  if (req.query.id) {
    try {
      const user = await Userdb.findById(req.query.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const users = await Userdb.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Update a user by user ID
exports.updateUser = async (req, res) => {
  const { userID,fullName, position, title, isAdmin, username, email } = req.body;
  const userId = req.params.id;

  try {
    const user = await Userdb.findByIdAndUpdate(
      userId,
      {
        userID,
        fullName,
        position,
        title,
        isAdmin,
        username,
        email,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by user ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Userdb.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// user
exports.view_user = (req, res) => {
  const userId = req.params.id;

  Userdb.findById(userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `Request not found with id ${requestId}` });
      } else {
        res.render("user", { user: user });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving request information" });
    });
  
  
};

// Render the user list new
exports.renderUserList = (req, res) => {
  Userdb.find()
    .then((users) => {
      res.render("userList", { users: users });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Function to fetch a specific request by ID
exports.fetchRequestById = async (requestId) => {
  try {
    const request = await Userdb.findById(requestId);
    return request;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch all users
exports.fetchAllUsers = async () => {
  try {
    const users = await Userdb.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};


