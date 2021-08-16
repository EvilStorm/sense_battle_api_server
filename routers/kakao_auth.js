'use strict'
//https://github.com/FirebaseExtended/custom-auth-samples/tree/master/kakao 카카오에서 제공하는 본 코드입니다.
const admin = require('firebase-admin');
const Async = require('async');
const axios = require('axios');


const kakaoRequestMeUrl = 'https://kapi.kakao.com/v2/user/me'

/**
 * requestMe - Returns user profile from Kakao API
 *
 * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function requestMe(kakaoAccessToken,callback) {
  console.log('Requesting user profile from Kakao API server. '+ kakaoAccessToken)
  return axios.get(kakaoRequestMeUrl,{
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + kakaoAccessToken}
  }).then((result)=>{
    callback(null,result.data,result);
  });
}

/**
   * updateOrCreateUser - Update Firebase user with the give email, create if
   * none exists.
   *
   * @param  {String} userId        user id per app
   * @param  {String} email         user's email address
   * @param  {String} displayName   user
   * @param  {String} photoURL      profile photo url
   * @return {Prommise<UserRecord>} Firebase user record in a promise
   */
function updateOrCreateUser(userId, email, displayName, photoURL) {
  console.log('updating or creating a firebase user');
  const updateParams = {
    provider: 'KAKAO',
    displayName: displayName,
  };
  if (displayName) {
    updateParams['displayName'] = displayName;
  } else {
    updateParams['displayName'] = email;
  }
  if (photoURL) {
    updateParams['photoURL'] = photoURL;
  }
  console.log(updateParams);
  return admin.auth().updateUser(userId, updateParams).then(function(userRecord) {
    // See the UserRecord reference doc for the contents of `userRecord`.
    console.log("Successfully updated user", userRecord.toJSON());
    userRecord['uid'] = userId;
    if (email) {
      userRecord['email'] = email;
    }
    return admin.auth().createUser(userRecord);
  });
}

/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 *
 * @param  {String} kakaoAccessToken access token from Kakao Login API
 * @return {Promise<String>}                  Firebase token in a promise
 */
function createFirebaseToken(kakaoAccessToken,callback) {

  Async.waterfall([
    (next)=>{
      requestMe(kakaoAccessToken,(error,response,boy)=>{
        const body =response // JSON.parse(response)
        const userId = `kakao:${body.id}`
        if (!userId) {
          return response.status(404)
          .send({message: 'There was no user with the given access token.'})
        }

        const updateParams = {
          uid :userId,
          email :body.kakao_account.email,
          provider: 'KAKAO',
        };

        next(null,updateParams)
      });
    },
    (userRecord, next) => {
        admin.auth().getUserByEmail(userRecord.email).then((userRecord)=>{
            next(null,userRecord);
    
    //   admin.auth().getUserByEmail(userRecord.email).then((userRecord)=>{
    //     next(null,userRecord);
      }).catch((error)=>{
        admin.auth().createUser(userRecord).then((user)=>{
            console.log('22222222222222')
          next(null,user)
        })
      })
    },
    (userRecord, next) => {
      const userId = userRecord.uid
      admin.auth().createCustomToken(userId, {provider: 'KAKAO'}).then((result)=>{
        next(null , result);
      });
    }
  ],(err, results) => {
      callback(results);
  });

}

module.exports={
  createFirebaseToken
}