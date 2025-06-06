const StatusCode = {
    FOBIRDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad Request Error',
    CONFLICT: 'Conflict Error'
}

class ErrorResponse extends Error {
    constructor(message,status) {
        super(message)
        this.status = status
    }
}



class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FOBIRDDEN) {
        super(message,statusCode)
    }
}

class ConflictError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message,statusCode)
    }
}

module.exports = {
    BadRequestError,
    ConflictError
}

