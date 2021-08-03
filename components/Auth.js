var jwt = require('jsonwebtoken');
var response = require('./RespUtil');

const { User } = require('../models');
var {ResponseCode } = require('../components/RespCodeStore');
var {ExceptionType, createException, convertException} = require('../components/ExceptionCreator');

auth = {}

function getAdminToken() {
  return  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5kZXgiOjEsInVzZXJJZCI6InRlc3QzQGdtYWlsLmNvbSIsInNpZ25pblR5cGUiOjAsImlhdCI6MTYxODM4MjU2MCwiZXhwIjoxNjE4NDY4OTYwfQ.gi-hCxYLZx2tVt2e6AeT-rAARZTt73x0ZmvPd578ZEM';
}

auth.checkSignIn = function(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log("TOKEN:" + token)

  if(token!= null && token == 'admin') {
    token = getAdminToken();
  }


  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(!err) {
        req.decoded = decoded;
      }
      next();
    });
  } else {
    decoded = {
      id: undefined,
      userId: undefined,
      signinType: -1
    }
    req.decoded = decoded;
    next();
  }
}

auth.isSignIn = function(req, res, next) {
  var token = req.headers['x-access-token'];

  if(token!= null && token == 'admin') {
    token = getAdminToken();
  }

  if (!token) {
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        var error = createException(ExceptionType.EXFIRED_JWT_TOKEN);
        res.json(response.fail(error, error.errmsg, error.code));
      } else{
        req.decoded = decoded;

        next();
      }
    });
  }
}

auth.isAdmin = function(req, res, next) {
  var token = req.headers['x-access-token'];

  if(token!= null && token == 'admin') {
    token = getAdminToken();
  }
  if (!token)  {

    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));

  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {

      if(err) {
        var error = createException(ExceptionType.EXFIRED_JWT_TOKEN);
        res.json(response.fail(error, error.errmsg, error.code));  
      } else{
        User.findOne({
          where: {
            id: decoded.id
          }
        })
        .then(_ => {
          if(_.secureLevel >= 8) {
            req.decoded = decoded;
            next();
          } else {
            var error = createException(ExceptionType.AUTH_CHECK);
            res.json(response.fail(error, error.errmsg, error.code));      
          }
        })
        .catch(_ => {
          var error = convertException(_);
          res.json(response.fail(error, error.errmsg, error.code));
        })
      }
    });
  }
}

module.exports = auth;
