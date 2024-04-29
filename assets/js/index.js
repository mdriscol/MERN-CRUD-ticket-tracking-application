
$("#add_request").submit(function (event) {
  event.preventDefault();

  var data = $(this).serialize();

  var request = {
    url: `http://localhost:3000/add-request`,
    method: "POST",
    data: data,
  };

  $.ajax(request)
    .done(function (response) {
      alert("Request added Successfully!");
      window.location.href = "http://localhost:3000/"; // Redirect to home page
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed: ", textStatus, errorThrown);
    });
});


$("#update_request").submit(function (event) {
  alert("Data updated Successfully!");
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  // Get the selected users from the "Assign To" dropdown
  var selectedUsers = $("#assignTo").val(); // Assuming "assignTo" is the ID of the dropdown
 
  // Add the selected users to the data object
  data["assignTo"] = selectedUsers;
 
  var request = {
    url: `http://localhost:3000/api/requests/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    console.log("AJAX request successful"); // Add this line
    // Show the success message
    $("#successMessage").show();
    
    // Hide the success message after a specified duration (4 seconds in this example)
    setTimeout(function () {
      $("#successMessage").hide();
    }, 4000);
    window.location.href = "http://localhost:3000/"; 
  });
});



if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/requests/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}


// add user

function submitForm() {
  // Serialize form data
  var formData = $("#add_user").serialize();

  // AJAX request
  $.ajax({
    type: "POST",
    url: "/api/users",
    data: formData,
    success: function (data) {
      // Optionally, you can handle the response data here
      console.log(data);

      // Reload the page
      window.location.reload();
    },
    error: function (error) {
      console.error("Error submitting form:", error);
    }
  });
}

