// _form.ejs
document.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      selectElement.appendChild(option);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// _search_results.ejs

document.addEventListener("DOMContentLoaded", (event) => {
  // Fetch the quote of the day from the API
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      // Update the text content of the quote element with the fetched quote
      document.getElementById("quote-text").textContent = data.content;
      // Update the quote author
      document.getElementById("quote-author").innerText = `- ${data.author}`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      // Handle errors if needed
    });
});

// update_request.ejs
// add timestamp in details field
document.addEventListener("DOMContentLoaded", (event) => {
  // Function to add timestamp to details field
  function addTimestamp() {
    var detailsInput = document.getElementById("details");
    var timestamp = new Date().toLocaleString(); // Get current timestamp

    detailsInput.value += "\n[" + timestamp + "] "; // Append timestamp to details field
  }

  // Event listener to call addTimestamp function when the field loses focus
  var detailsInput = document.getElementById("details");
  detailsInput.addEventListener("blur", addTimestamp);
});

// add assignTo user dropdwon script
document.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get("/api/users")
    .then(function (response) {
      const selectElement = document.getElementById("assignTo");
      const selectedUser = document.getElementById("selectedUser").value;

      response.data.forEach((user) => {
        const option = document.createElement("option");
        option.value = `${user.fullName} (${user.email})`; // Set the value as "Full Name (Email)"
        option.text = `${user.fullName} (${user.email})`; // Display full name and email

        // Check if the current user matches the selected user
        if (`${user.fullName} (${user.email})` === selectedUser) {
          option.selected = true; // Set the option as selected
        }

        selectElement.appendChild(option);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});
// update request.ejs redirect to the main page

document.addEventListener("DOMContentLoaded", (event) => {
  window.redirectToMainPage = function () {
    window.location.href = "/"; // Redirect to the main page
  };
});
// index.ejs
// quote
document.addEventListener("DOMContentLoaded", (event) => {
  // Fetch the quote of the day from the API
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      // Update the text content of the quote element with the fetched quote
      document.getElementById("quote-text").textContent = data.content;
      // Update the quote author
      document.getElementById("quote-author").innerText = `- ${data.author}`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      // Handle errors if needed
    });
});
