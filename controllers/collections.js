const User = require("../models/user");

exports.postFavoriteGames = async (req, res, next) => {
	const { userToken, favoriteGames } = req.body;
	console.log(
		`Post Favorite Games, userToken: ${userToken}, favoriteGamesCount: ${favoriteGames.length}`
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

		user.favoriteGames = favoriteGames;
		await user.save();
		const response = {
			message: "Favorite Games Updates",
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
