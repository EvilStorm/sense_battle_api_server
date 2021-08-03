ExceptionType = {
    INSERT_RESULT_EMPTY: 'INSERT_RESULT_EMPTY',
    INVALID_PARAMS: 'INVALID_PARAMS',
    REQUIRED_JWT_TOKEN: 'REQUIRED_JWT_TOKEN',
    EXFIRED_JWT_TOKEN: 'EXFIRED_JWT_TOKEN',
    NOT_FOUND_REFRESHTOKEN: 'NOT_FOUND_REFRESHTOKEN',
    NOT_FOUND_ACCOUNT: 'NOT_FOUND_ACCOUNT',
    AUTH_CHECK: 'AUTH_CHECK',
    CREATE_FAIL: 'CREATE_FAIL',
    QUERY_FAIL: 'QUERY_FAIL',
    USER_ID_IS_USED: 'USER_ID_IS_USED',
    MongoDBError: 530,
    JWT_ERROR: 531,
}


var createException = function(type, title = null, message = null) {
    if(title == null) {
        title = ExceptionInfos[type].title;
        message = ExceptionInfos[type].message;
    }

    var result = new Error(title);
    result.code = ExceptionInfos[type].code;
    result.title = title;
    result.errmsg = message;

    return result
}

var convertException = function(exception) {
    console.log("convertException name: " + exception.name );
    console.log("convertException name: " + exception.message );
    console.log("convertException : ");
    console.log(exception);
    
    var result = new Error();
    if( exception.name == 'MongoError') {
        result.code = ExceptionType.MongoDBError;
        result.title = exception.name;
        result.errmsg = exception.errmsg;    
    } else if( exception.name == 'VerifyErrors') {
    } else if( exception.name == 'ReferenceError' || exception.name == 'secretOrPrivateKey') {
        result.code = ExceptionType.JWT_ERROR;
        result.title = exception.name;
        result.errmsg = exception.message;            
    } else {
        return exception
    }

    return result
}

//500~520: 
ExceptionInfos = {
    INSERT_RESULT_EMPTY: {
        code: 550,
        title: 'Insert result is null',
        message: '데이터 입력을 실패 했습니다.'
    }, 
    QUERY_FAIL: {
        code: 551,
        title: 'Query Fail',
        message: '서버에 문제가 있습니다.'
    }, 
    INVALID_PARAMS: {
        code: 556,
        title: 'Invalid Params',
        message: '필수 파라메터가 없습니다. 확인 해주세요.'
    },
    AUTH_CHECK: {
        code: 521,
        title: '권한없음',
        message: '사용할 권한이 없습니다.'
    },
    EXFIRED_JWT_TOKEN: {
        code: 401,
        title: '토큰만료',
        message: '토큰이 만료되었습니다.'
    },
    REQUIRED_JWT_TOKEN: {
        code: 522,
        title: '회원 전용',
        message: '로그인 후 사용해주세요.'
    },
    CREATE_FAIL: {
        code: 513,
        title: '생성 실패',
        message: '생성에 실패했습니다. 잠시후 다시 시도해주세요.'
    },
    NOT_FOUND_REFRESHTOKEN: {
        code: 532,
        title: '로그인 토큰 없음',
        message: '다시 로그인 해주세요.'
    },
    NOT_FOUND_ACCOUNT: {
        code: 520,
        title: '회원정보 없음',
        message: '일치하는 회원정보를 찾을 수 없습니다.'
    },
    USER_ID_IS_USED: {
        code: 527,
        title: '가입되어 있습니다.',
        message: '이미 가입되어있는 계정입니다.'
    },
    

}


module.exports = {
    ExceptionType: ExceptionType,
    createException: createException,
    convertException: convertException
}