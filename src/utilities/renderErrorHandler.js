const renderErrorHandler = (res, err) => {
    res.status(500).json({
        message: err.message || "something went wrong"
    })
}

module.exports = renderErrorHandler;