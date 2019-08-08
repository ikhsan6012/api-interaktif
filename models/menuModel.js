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

menuModel.post('findOneAndDelete', async (menu, next) => {
	const ContentModel = require('./contentModel')
	await ContentModel.deleteMany({ menu: menu.id })
	next()
})

module.exports = mongoose.model('Menu', menuModel)