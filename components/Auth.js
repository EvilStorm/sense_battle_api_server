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
  var token = req.headers['identify-id'];

  if(token != null && token == 'admin') {
    req.decoded = {
      token: req.headers['identify-id'],
      id: req.headers['id'],
    };
    next();
  } else {
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));

  }
}

module.exports = auth;
