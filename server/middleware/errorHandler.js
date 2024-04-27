const { badRequest,
    unauthorized,
    forbidden,
    notFound } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case badRequest:
            res.json({ title: "Bad Request", message: err.message, stackTrack: err.stack });
            break;
        case forbidden:
            res.json({ title: "forbidden", message: err.message, stackTrack: err.stack });
            break;
        case unauthorized:
            res.json({ title: "Unauthorized", message: err.message, stackTrack: err.stack });
            break;
        case notFound:
            res.json({ title: "Unauthorized", message: err.message, stackTrack: err.stack });
            break;
        default:
            console.log("all good!");

    }

    res.json({ title: "Not Found", message: err.message, stackTrack: err.stack });
}
module.exports = errorHandler;