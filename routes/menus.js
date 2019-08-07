const express = require('express')
const router = express.Router()
const MenuModel = require('../models/menuModel')

// ---------- GET METHOD ---------- //
// GET ALL MENUS
router.get('/', async (req, res) => {
	try {
		const menus = await MenuModel.find({}, '-contents')
		res.json(menus)
	} catch (err) {
		res.status(405).json(err)
	}
})

// ---------- POST METHOD ---------- //
// ADD MENU
router.post('/add', async (req, res) => {
	try {
		const { code, name } = req.body
		if(!code || !name) throw Error({ errmsg: 'Data Tidak Lengkap...' })
		const newMenu = new MenuModel({ code, name })
		const menu = await newMenu.save()
		res.json(menu)
	} catch (err) {
		res.status(405).json(err)
	}
})

module.exports = router