var {ResponseCode} = require('./RespCodeStore');

var response = {};


response.success = function(data, code = ResponseCode.SUCCESS.SUCCESS, status = 'success', err = null){ //1 

  if(data == null) {
    data = {message: "데이터가 없습니다."}
    code = ResponseCode.SUCCESS.EMPTY
  } else if(Array.isArray(data)) {
    if(data.length == 0) {
      data = {message: "데이터가 없습니다."}
      code = ResponseCode.SUCCESS.EMPTY        
    }
  }
  return {
    status:status,
    code: code,
    errors:err,
    data:data
  };
};
response.fail = function(exception = null, msg = '', code = ResponseCode.FAIL.UNDEFINED_YET){ //1 
  console.log(
    "Fail Error Log!!!:" +exception 
  )
  // console.log(err)
  return {
    status:'fail',
    code: code,
    error:{
      trace: exception.message,
      message: msg
    },
    data:null
  };
};

response.successTrue = function(data){ //1 
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

response.successTrue = function(data){ //1 
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};



response.successTrue = function(data, store){ //1 
  return {
    success:true,
    message:null,
    errors:null,
    store: store,
    data:data
  };
};

response.successFalse = function(err, message){ //2
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? response.parseError(err): message,
    data:null
  };
};

response.parseError = function(errors){ //3
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      // parsed[name] = { message:validationError.message };
      parsed = validationError.message;
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    // parsed.username = { message:'This username already exists!' };
    parsed = 'This username already exists!'
  } else {
    // parsed.unhandled = errors;
    parsed = errors.message;
  }
  return parsed;
};

module.exports = response;