// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATjR1f2cshA1dZ5whoCS7F68uOAYkA2k4",
    authDomain: "swebanking-24c58.firebaseapp.com",
    databaseURL: "https://swebanking-24c58-default-rtdb.firebaseio.com",
    projectId: "swebanking-24c58",
    storageBucket: "swebanking-24c58.appspot.com",
    messagingSenderId: "648505711977",
    appId: "1:648505711977:web:2374847541ea43740731f8",
    measurementId: "G-T1WF71172W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
let loginAttempts = 0;

function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Attempt to log in with Firebase
    auth.signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            const user = auth.currentUser;
            const user_data = {
                lastLogin: Date.now()
            };

            // Push to Firebase Realtime Database
            database.ref('users/' + user.uid).update(user_data);

            // Check user role and redirect accordingly
            checkUserRole(user.uid);
        })
        .catch((error) => {
            loginAttempts++;
            const errorMessage = error.message;
            if (loginAttempts >= 3) {
                alert("Too many failed login attempts. Your account is suspended.");
                // Optional: Handle account suspension logic here.
            } else {
                alert(`Error: ${errorMessage}`);
            }
        });
    return false; // Prevent default form submission
}

function checkUserRole(userId) {
    const userRoleRef = database.ref('users/' + userId + '/role');
    userRoleRef.once('value', (snapshot) => {
        const userRole = snapshot.val();
        if (userRole === "Admin") {
            window.location.assign("admin.html");
        } else {
            window.location.assign("user.html");
        }
    });
}

function createNewUser() {
    const firstName = document.getElementById("newFirstName").value;
    const lastName = document.getElementById("newLastName").value;
    const address = document.getElementById("newAddress").value;
    const dob = document.getElementById("newDOB").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const role = document.getElementById("Role").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = auth.currentUser;
            const user_data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                address: address,
                role: role,
                lastLogin: Date.now()
            };

            // Save user data to Firebase Realtime Database
            database.ref('users/' + user.uid).set(user_data);
            closeModal('createUserModal');
        })
        .catch((error) => {
            alert(`Error creating user: ${error.message}`);
        });
}

// Modal control functions
function openForgotPasswordModal() {
    document.getElementById("forgotPasswordModal").style.display = "block";
}

function openCreateUserModal() {
    document.getElementById("createUserModal").style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modals if clicked outside
window.onclick = function(event) {
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const createUserModal = document.getElementById('createUserModal');
    if (event.target === forgotPasswordModal) {
        closeModal('forgotPasswordModal');
    } else if (event.target === createUserModal) {
        closeModal('createUserModal');
    }
}
