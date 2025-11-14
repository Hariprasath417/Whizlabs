// Handles a 200 OK response
function handleSuccess(res, { success, message, data }) {
    return res.status(200).json({ success, message, data });
}

// Handles a 201 Created response
function handleCreated(res, { success, message, data }) {
    return res.status(201).json({ success, message, data });
}

// Handles a 400 Bad Request response
function handleBadRequest(res, { success, message }) {
    return res.status(400).json({ success, message });
}

// Handles a 401 Unauthorized response
function handleUnauthorized(res, { success, message }) {
    return res.status(401).json({ success, message });
}

// Handles a 404 Not Found response
function handleNotFound(res, { success, message }) {
    return res.status(404).json({ success, message });
}

// Handles a 500 Internal Server Error response
function handleServerError(res, { success, message }) {
    return res.status(500).json({ success, message });
}

module.exports = {
    handleSuccess,
    handleCreated,
    handleBadRequest,
    handleUnauthorized,
    handleNotFound,
    handleServerError
};

