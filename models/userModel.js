const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
})

userSchema.pre('save', function(next){
	const user = this
	if (!user.isModified('password')) return next()
	user.password = bcrypt.hashSync(user.password, 15)
	next()
})

module.exports = mongoose.model('User', userSchema)