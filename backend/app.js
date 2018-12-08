const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')

const server = restify.createServer()

//Middleware
server.use(restify.plugins.bodyParser())

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  )
})

const db = mongoose.connection

db.on('error', (err) => console.log('Error on db connection', err))

db.once('open', () => {
  require('./routes/feedbacks')(server)
  console.log(`Server started on port ${config.PORT}`)
})
