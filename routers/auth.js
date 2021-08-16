const express = require('express');
const router = express.Router();
const response = require('../components/RespUtil');
const {createException} = require('../components/ExceptionCreator');
var {ResponseCode} = require('../components/RespCodeStore');

var {sequelize, noun} = require('../models');

const kakao_auth = require('./kakao_auth.js');

var admin = require("firebase-admin");

var serviceAccount = require("../firebase_service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.get('/callbacks/kakao/signIn', async function (req, res) {
    const redirect = `webauthcallback://success?${new URLSearchParams(req.query).toString()}`;
    console.log(`Redirecting to ${redirect}`);
    response.redirect(307, redirect);
});

router.post('/callbacks/kakao/token', async function (req, res) {

    console.log(req.body)
    kakao_auth.createFirebaseToken(req.body["accessToken"],(result)=>{
        res.send(result);
      });
});

router.post("/callbacks/sign_in_with_apple", (request, response) => {
    const redirect = `intent://callback?${new URLSearchParams(
      request.body
    ).toString()}#Intent;package=${
      'com.hj.sense_battle'
    };scheme=signinwithapple;end`;
  
    console.log(`Redirecting to ${redirect}`);
  
    response.redirect(307, redirect);
});
  
router.post("/sign_in_with_apple", async (request, response) => {
const auth = new AppleAuth(
    {
    // use the bundle ID as client ID for native apps, else use the service ID for web-auth flows
    // https://forums.developer.apple.com/thread/118135
    client_id:
        request.query.useBundleId === "true"
        ? 'com.hj.senseBattle'
        : 'com.hj.senseBattle',
    team_id: '2YW5U8YL8F',
    redirect_uri:
        "https://flutter-sign-in-with-apple-example.glitch.me/callbacks/sign_in_with_apple", // does not matter here, as this is already the callback that verifies the token after the redirection
    key_id: process.env.KEY_ID
    },
    process.env.KEY_CONTENTS.replace(/\|/g, "\n"),
    "text"
);

console.log(request.query);

const accessToken = await auth.accessToken(request.query.code);

const idToken = jwt.decode(accessToken.id_token);

const userID = idToken.sub;

console.log(idToken);

// `userEmail` and `userName` will only be provided for the initial authorization with your app
const userEmail = idToken.email;
const userName = `${request.query.firstName} ${request.query.lastName}`;

// 👷🏻‍♀️ TODO: Use the values provided create a new session for the user in your system
const sessionID = `NEW SESSION ID for ${userID} / ${userEmail} / ${userName}`;

console.log(`sessionID = ${sessionID}`);

response.json({ sessionId: sessionID });
});

  
module.exports = router;