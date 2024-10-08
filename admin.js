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
const db = firebase.firestore();

const database =firebase.database();
var database_ref = database.ref();

function CreateUser() {
        const firstName = document.getElementById("newFirstName").value;
        const lastName = document.getElementById("newLastName").value;
        const address = document.getElementById("newAddress").value;
        const dob = document.getElementById("newDOB").value;
        const email = document.getElementById("newEmail").value;
        const password = document.getElementById("newPassword").value;
        const role = document.getElementById("Role").value;
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser
        var user_data = {
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName,
            dob : dob,
            address : address,
            role : role,
            lastLogin : Date.now()
        }
        database_ref.child('users/' + user.uid).set(user_data);
        closeModal('createUserModal');
    })
}

function UpdateUser() {
    const firstName = document.getElementById("newFirstName").value;
    const lastName = document.getElementById("newLastName").value;
    const address = document.getElementById("newAddress").value;
    const dob = document.getElementById("newDOB").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const role = document.getElementById("Role").value;
    // Declare user variable
    var user = auth.currentUser
    var user_data = {
        email : email,
        password : password,
        firstName : firstName,
        lastName : lastName,
        dob : dob, 
        address : address,
        role : role,
    }
    database_ref.child('users/' + user.uid).set(user_data);
    closeModal('UpdateUserModal');
}