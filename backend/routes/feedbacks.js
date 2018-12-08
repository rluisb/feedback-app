const errors = require('restify-errors')
const Feedback = require('../models/Feedback')

module.exports = (server) => {
  server.get('/feedbacks', async(req, res, next) => {
    try {
      const feedbacks = await Feedback.find({})
      res.send(feedbacks)
      next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.post('/feedbacks', async(req, res, next) => {
      if (!req.is('application/json')) {
        return next(new errors.InvalidContentError('Expects application/json'))
      }

      const { employeeName, comment, rate } = req.body

      const feedback = new Feedback({
        employeeName,
        comment,
        rate
      })

      try {
        const newFeedback = await feedback.save()
        res.send(201)
        next()
      } catch (err) {
        return next(new errors.InternalError(err.message))
      } 
  })
}
