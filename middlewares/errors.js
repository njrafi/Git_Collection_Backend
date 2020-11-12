// Code used from https://github.com/w3cj/express-api-starter/blob/master/src/middlewares.js
const notFound = (req, res, next) => {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	console.log(err.message);
	console.log(process.env.NODE_ENV === "production" ? "🥞" : err.stack);
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
