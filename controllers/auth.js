const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
	const { token, name, email, photoUrl, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (user) {
			const response = {
				message: "Login Successfull",
				user: user,
			};
			console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
			return res.status(200).json(response);
		}

		const newUser = new User({
			token: token,
			name: name,
			email: email,
			photoUrl: photoUrl,
			providerId: providerId,
		});

		await newUser.save();
		const response = {
			message: "SignUp Successful",
			user: newUser,
		};
		console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
		return res.status(200).json(response);
	} catch (err) {
		next(err);
		return err;
	}
};

