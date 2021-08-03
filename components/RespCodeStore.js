ResponseCode = {
    SUCCESS: {
        SUCCESS: 200, //Success
        USED: 251, //사용중 
        NOT_FOUND_USER: 252, //사용자 정보 없음
        EMPTY: 254, //쿼리 결과 없음.
        CHECK_PARAM: 255, //검색 결과 범위 초과
        UNIQUE_FIELD_IS_USED: 241, //이미 사용중인 Field
    },
    FAIL: {
        UNDEFINED_YET: 500,
        QUERY_FAIL: 501,
        AUTH_CHECK: 521, //권환 없음
        REQUIRED_JWT_TOKEN: 522,
        INVALID_PARAMS: 556, //필수 파라매터 존재하지 않음.
        MongoDBError: 530,
        INSERT_RESULT_EMPTY: 550,
    },
}


module.exports = {
    ResponseCode: ResponseCode
}