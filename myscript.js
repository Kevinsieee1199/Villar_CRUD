// Get reference to the signup form
const signupForm = document.getElementById("signupForm");

// Get reference to the buttons
const addButton = document.getElementById("insert");
const readButton = document.getElementById("read");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");

// Realtime Database reference
const db = firebase.database();

// Signup form submit event listener
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = signupForm.elements.id.value;
  const fname = signupForm.elements.fname.value;
  const middleName = signupForm.elements.middleName.value;
  const surname = signupForm.elements.surname.value;
  const address = signupForm.elements.address.value;

  // Check if user with the same ID already exists
  db.ref("users/" + id)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
      } else {
        // Add user to Realtime Database
        db.ref("users/" + id)
          .set({
            id: id,
            fname: fname,
            middleName: middleName,
            surname: surname,
            address: address
          })
          .then(() => {
            console.log("User added to Realtime Database");
            Swal.fire("User added successfully!");
            signupForm.reset();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error adding user. Please try again.");
          });
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire("Error checking user. Please try again.");
    });
});

// Read button click event listener
readButton.addEventListener("click", () => {
  const id = signupForm.elements.id.value;

  // Read user from Realtime Database
  db.ref("users/" + id)
    .once("value")
    .then((snapshot) => {
      const user = snapshot.val();
      if (user) {
        // Set the form fields with the retrieved user data
        signupForm.elements.id.value = user.id;
        signupForm.elements.fname.value = user.fname;
        signupForm.elements.middleName.value = user.middleName;
        signupForm.elements.surname.value = user.surname;
        signupForm.elements.address.value = user.address;

        console.log("User retrieved from Realtime Database");
      } else {
        console.log("User does not exist in Realtime Database");
        Swal.fire("User does not exist in the database.");
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire("Error fetching user. Please try again.");
    });
});

// Update button click event listener
updateButton.addEventListener("click", () => {
  const id = signupForm.elements.id.value;
  const fname = signupForm.elements.fname.value;
  const middleName = signupForm.elements.middleName.value;
  const surname = signupForm.elements.surname.value;
  const address = signupForm.elements.address.value;

  // Update user in Realtime Database
  db.ref("users/" + id)
    .update({
      fname: fname,
      middleName: middleName,
      surname: surname,
      address: address
    })
    .then(() => {
      console.log("User updated in Realtime Database");
      Swal.fire("User updated successfully!");
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error);
      Swal.fire("Error updating user. Please try again.");
    });
});

// Delete button click event listener
deleteButton.addEventListener("click", () => {
  const id = signupForm.elements.id.value;

  // Delete user from Realtime Database
  db.ref("users/" + id)
    .remove()
    .then(() => {
      console.log("User deleted from Realtime Database");
      Swal.fire("User deleted successfully!");
    })
    .catch((error) => {
      console.log(error);
      Swal.fire("Error deleting user. Please try again.");
    });

  // Reset the form fields after deleting the user
  signupForm.reset();
});


