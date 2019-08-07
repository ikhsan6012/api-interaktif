const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MenuModel = require('./menuModel')

const contentSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true
	},
	menu: {
		type: Schema.Types.ObjectId,
		ref: 'Menu'
	}
})

contentSchema.post('save', async (doc, next) => {
	try {
		await MenuModel.findByIdAndUpdate(doc.menu, { $push: { contents: doc.id } })
		next()
	} catch (err) {
		throw err
	}
})

contentSchema.post('findOneAndDelete', async (doc, next) => {
	try {
		await MenuModel.findByIdAndUpdate(doc.menu, { $pull: { contents: doc.id } })
		next()
	} catch (err) {
		throw err
	}
})

module.exports = mongoose.model('Content', contentSchema)