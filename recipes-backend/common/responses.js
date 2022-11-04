function successResponse(statusCode = 200, res) {
    return {
        statusCode: statusCode,
        success: true,
        body: res
    }
}

function failureResponse(statusCode = 501, error) {
    let message = error.message || "Unknown error"
    let errorMessage = error.errorMessage || "Unknown error"
    return {
        statusCode: statusCode,
        success: false,
        body: {
            message: message,
            errorMessage: errorMessage,
        }
    }
}

module.exports = {
    successResponse,
    failureResponse
}
