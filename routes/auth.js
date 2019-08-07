const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const router = express.Router()

// ---------- POST METHOD ---------- //
// ADD USER
router.post('/add', async (req, res) => {
	try {
		const { username, name, password } = req.body
		if(!username) throw Error({ errmsg: 'Username Diperlukan...' })
		if(!name) throw Error({ errmsg: 'Nama Diperlukan...' })
		if(!password) throw Error({ errmsg: 'Password Diperlukan...' })
		const newUser = new UserModel({ username, name, password })
		const user = await newUser.save()
		res.json({ username, name })
	} catch (err) {
		res.status(405).json(err)
	}
})

// LOGIN
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		if(!username) throw Error({ errmsg: 'Username Diperlukan...' })
		if(!password) throw Error({ errmsg: 'Password Diperlukan...' })
		const user = await UserModel.findOne({ username })
		if(!user) res.send({ errmsg: 'Username atau Password Salah...' })
		const isAuth = bcrypt.compareSync(password, user.password)
		if(!isAuth) res.send({ errmsg: 'Username atau Password Salah...' })
		res.json({ username: user.username })
	} catch (err) {
		res.status(405).json(err)
	}
})

module.exports = router