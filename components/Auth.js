var jwt = require('jsonwebtoken');
var response = require('./RespUtil');

const { User } = require('../models');
var {ResponseCode } = require('../components/RespCodeStore');
var {ExceptionType, createException, convertException} = require('../components/ExceptionCreator');

auth = {}


auth.isSignIn = function(req, res, next) {
  var token = req.headers['identify-id'];

  if (!token) {
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));
  } else {
    req.decoded = {
      token: req.headers['identify-id'],
      id: req.headers['id'],
    };
  
    console.log("req.decoded" )
    console.log(req.decoded )
    
    next();
  }
}

auth.isAdmin = function(req, res, next) {
  console.log(`isAdmin: ${JSON.stringify(req.headers)}` )
  var token = req.headers['identify-id'];

  console.log(`token: ${token}` )

  if(token != null && token == 'admin') {
    console.log(`IS ADMIN!!!!!!!!` )
    
    req.decoded = {
      token: req.headers['identify-id'],
      id: req.headers['id'],
    };
    next();
  } else {
    console.log(`IS NOT ADMIN!!!!!!!!` )
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));

  }
}

module.exports = auth;
