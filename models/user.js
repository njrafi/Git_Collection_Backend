const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	photoUrl: {
		type: String,
		required: false,
	},
	providerId: {
		type: String,
		required: false,
	},
	githubUser: {
		type: Object,
		required: true,
	},
	collections: [
		{
			type: Object,
		},
	],
});

module.exports = mongoose.model("User", userSchema);
