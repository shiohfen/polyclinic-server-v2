const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
// const client = require('twilio')('ACda737055fd889684f26ca50f0a91703b', '8ecdb3e3b53c7a692e9d21a04e4b7179',);
const app = express();


var accountSid = "ACda737055fd889684f26ca50f0a91703b" // Your Account SID from www.twilio.com/console
var authToken = "f681f6df21b1edaa9df480bbcc8f8cc0" // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});



app.use(bodyParser.json())

app.use(cors({ origin: true }));
app.options("*", cors())


const admin = require('firebase-admin');
// const firebase = require('firebase/compat/app');


const { private_key } = JSON.parse(process.env.private_key)

var serviceAccount = {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": private_key,
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url,
}

// const sa = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/registerUser', (req, res) => {
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: req.body.name,
        photoURL: req.body.photoURL,
        disabled: false,
    })
        .then(async (userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            res.send(userRecord.uid)
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            res.send(error);
        });
});

app.post('/disableUser', (req, res) => {
    admin.auth().updateUser(req.body.uid, {
        disabled: true,
    })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully archived user', userRecord.uid);
            res.send();

        })
        .catch((error) => {
            console.log('Error:', error);
            res.send(error);

        });
});

app.post('/enableUser', (req, res) => {
    admin.auth().updateUser(req.body.uid, {
        disabled: false,
    })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully restored user', userRecord.uid);
            res.send();

        })
        .catch((error) => {
            console.log('Error:', error);
            res.send(error);

        });
});

app.post('/deleteUser', (req, res) => {
    admin.auth()
        .deleteUser(req.body.uid)
        .then(() => {
            console.log('Successfully deleted user');
            res.send();

        })
        .catch((error) => {
            console.log('Error deleting user:', error);
            res.send(error);

        });
});

app.post('/updateEmail', (req, res) => {
    admin.auth()
        .updateUser(req.body.uid, {
            email: req.body.email,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully updated user', userRecord.toJSON());
            res.send();
        })
        .catch((error) => {
            console.log('Error updating user:', error);
            res.send(error);
        });
});

app.get('/', (req, res) => {
    res.send('please work');
});

app.post('/sendSMS', (req, res) => {
    client.messages
        .create({
            body: req.body.text,
            messagingServiceSid: 'MG756975548d9e73bd8abcdb41ceb547a7',
            to: req.body.number
        })
        .then(() => {
            console.log("Message sent!")
            res.send("Message sent!")
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port: ' + process.env.PORT || 5000);
})
