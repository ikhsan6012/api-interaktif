const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuModel = new Schema({
	code: {
		type: String,
		trim: true,
		required: true,
		lowercase: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	contents: [{
		type: Schema.Types.ObjectId,
		ref: 'Content'
	}]
})

module.exports = mongoose.model('Menu', menuModel)