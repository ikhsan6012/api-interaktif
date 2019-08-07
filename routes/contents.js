const express = require('express')
const router = express.Router()
const ContentModel = require('../models/contentModel')
const MenuModel = require('../models/menuModel')

// ---------- GET METHOD ---------- //
// GET CONTENTS
router.get('/', async (req, res) => {
	try {
		const { query } = req
		const data = {}
		const keys = Object.keys(query)
		for(let key of keys){
			if(!key.match(/_id|code|name/)) continue
			data[key] = key.match(/name/) ? new RegExp(query[key], 'i') : query[key]
		}
		const menu = Object.keys(data).length
			? await MenuModel.findOne(data).populate('contents')
			: await MenuModel.find().populate('contents')
		res.send(menu)
	} catch (err) {
		res.status(405).json(err)		
	}
})

// ---------- POST METHOD ---------- //
// ADD CONTENTS
router.post('/add', async (req, res) => {
	try {
		const { title, body, menu } = req.body
		console.log(title)
		if(!title || !body || !menu) throw Error({ errmsg: 'Data Tidak Lengkap...' })
		// if(!body.menu) throw Error({ errmsg: 'Menu Id Diperlukan...' })
		// const data = {}
		// const keys = Object.keys(body)
		// for(let key of keys) {
		// 	if(!key.match(/menu|title|body/)) continue
		// 	data[key] = body[key]
		// }
		const newContent = new ContentModel({ title, body, menu })
		const content = await newContent.save()
		res.json(content)
	} catch (err) {
		console.log(err)
		res.status(405).json(err)
	}
})

// ---------- PUT METHOD ---------- //
// UPDATE CONTENT
router.put('/update/:contentId', async (req, res) => {
	try {
		const { contentId } = req.params
		const { title, body } = req.body
		if(!title && !body) throw Error({ errmsg: 'Tidak Ada Data Yang Dikirim...' })
		const update = !title ? { body } : !body ? { title } : { title, body }
		const content = await ContentModel.findByIdAndUpdate(contentId, update, { new: true })
		res.json(content)
	} catch (err) {
		res.status(405).json(err)
	}
})

// ---------- DELETE METHOD ---------- //
// DELETE CONTENT
router.delete('/delete/:contentId', async (req, res) => {
	try {
		const { contentId } = req.params
		const deletedContent = await ContentModel.findByIdAndDelete(contentId)
		res.json(deletedContent)
	} catch (err) {
		res.status(405).json(err)				
	}
})

module.exports = router