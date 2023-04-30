//Clinics

// get all clinics
fb.db.collection("clinics").get()
// delete clinic and staff
// update clinic

//Doctors
// get all doctors
fb.db.collection("doctors").get()
// delete doctor
fb.db.collection("doctors").doc(id).delete().then(() => { })
// update doctor
fb.db.collection("doctors").doc(id).update({}).then(() => { })

//Staff
// get all staff
fb.db.collection("staffs").get()

//Appointments

// get all appointments
fb.db.collection("appointments").doc().orderBy("date")

// accept appointment
fb.db.collection("appointments").doc(id).update({
    status: "accepted"
})

// decline appointment
fb.db.collection("appointments").doc(id).update({
    status: "declined"
})

// cancel appointment
fb.db.collection("appointments").doc(id).update({
    status: "canceled"
})

// USER:
// 	login
fb.auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // User is signed in
        const user = userCredential.user;
        console.log(`User ${user.uid} is signed in`);
    })
    .catch((error) => {
        // An error occurred
        console.log(error.message);
    });
// 	logout
fb.auth.signOut()
    .then(() => {
        // User is signed out
        console.log('User is signed out');
    })
    .catch((error) => {
        // An error occurred
        console.log(error.message);
    });
// 	Sign Up

// 	Update : details, password, email

// 	Forgot Password
