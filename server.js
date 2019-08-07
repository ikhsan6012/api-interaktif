const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

mongoose.connect(`mongodb://${ process.env.MONGO_HOST }:${ process.env.MONGO_PORT }/${ process.env.MONGO_DB }`, {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true
}, err => {
	if(err) console.log(err)
	console.log('Database Connected')
	const port = process.env.PORT || 4000
	const server = http.createServer(app)
	server.listen(port, () => console.log(`Server running on port ${ port }`))
})