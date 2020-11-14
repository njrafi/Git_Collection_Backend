const User = require("../models/user");

exports.postCollection = async (req, res, next) => {
	const { userToken, collection: newCollection } = req.body;
	if (process.env.NODE_ENV !== "production")
		console.log(
			`Post Colection, userToken: ${userToken}, collection: ${newCollection}`
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

		let edited = false;
		let editedCollection = user.collections.map((collection) => {
			if (collection.createdAt === newCollection.createdAt) {
				edited = true;
				return newCollection;
			}
			return collection;
		});
		if (edited) {
			user.collections = editedCollection;
			await user.save();
			const response = {
				message: "Collection Edited",
				collections: user.collections,
			};
			console.log("Collection Edited");
			return res.status(200).json(response);
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

exports.deleteCollection = async (req, res, next) => {
	const { userToken, createdAt } = req.body;
	if (process.env.NODE_ENV !== "production")
		console.log(
			`Delete Colection, userToken: ${userToken}, DeletedPostCreatedAt: ${createdAt}`
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

		let newCollections = user.collections.filter(
			(collection) => collection.createdAt !== createdAt
		);
		if (newCollections.length == user.collections.length) {
			return res.status(404).json({
				message: "Post not found. Invalid createdAt time",
			});
		}

		user.collections = newCollections;
		await user.save();
		const response = {
			message: "Collection Deleted",
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
			collections: user.collections,
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
