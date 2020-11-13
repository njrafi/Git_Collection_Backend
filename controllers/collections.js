const User = require("../models/user");

exports.postCollection = async (req, res, next) => {
	const { userToken, collection: newCollection } = req.body;
	if (process.env.NODE_ENV !== "production")
		console.log(
			`Post Colection, userToken: ${userToken}, favoriteGamesCount: ${newCollection.length}`
		);
	try {
		const user = await User.findOne({ token: userToken });
		if (!user) {
			const response = {
				message: "User not found",
			};
			console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
			return res.status(401).json(response);
		}

		user.collections = [...user.collections, newCollection];
		await user.save();
		const response = {
			message: "New Collection Added",
			collections: user.collections,
		};
		return res.status(200).json(response);
	} catch (err) {
		next(err);
		return err;
	}
};

exports.getCollections = async (req, res, next) => {
	const userToken = req.query.userToken;
	console.log(`get Collections Games, userToken: ${userToken}`);
	try {
		const user = await User.findOne({ token: userToken });
		if (!user) {
			const response = {
				message: "Invalid userToken",
			};
			console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
			return res.status(401).json(response);
		}
		const response = {
			message: "Collection retrieved successful",
			favoriteGames: user.collections,
		};
		console.log(
			process.env.NODE_ENV === "production"
				? "🎉"
				: "Get Collections Retrieved: ",
			user.collections.length
		);
		return res.status(200).json(response);
	} catch (err) {
		next(err);
		return err;
	}
};
