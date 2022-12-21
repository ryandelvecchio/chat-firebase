// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateDisplayName = functions.https.onCall((data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "You must be logged in to update your display name"
        );
    }

    // Check if the display name is not empty
    if (data.displayName === "") {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Display name cannot be empty"
        );
    }

    // Check if the display name is not longer than 20 characters
    if (data.displayName.length > 20) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Display name cannot be longer than 20 characters"
        );
    }

    // Update the display name
    return admin
        .auth()
        .updateUser(context.auth.uid, {
            displayName: data.displayName
        })
        .then(() => {
            return {
                message: `Display name updated to ${data.displayName}`
            };
        }
        );
});


