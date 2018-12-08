const errors = require('restify-errors');
const Feedback = require('../models/Feedback');

module.exports = (server) => {
  server.get('/feedbacks', async (req, res, next) => {
    try {
      const feedbacks = await Feedback.find({});
      res.send(200, feedbacks);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get('/feedbacks/:id', async (req, res, next) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      res.send(200, feedback);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no feedback with the id of ${req.params.id}`));
    }
  });


  server.post('/feedbacks', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    const {
      employee, manager, comment, rate,
    } = req.body;

    const feedback = new Feedback({
      employee,
      manager,
      comment,
      rate,
    });

    try {
      const newFeedback = await feedback.save();
      res.send(201, newFeedback);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  server.put('/feedbacks/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    try {
      const feedback = await Feedback.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200, feedback);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no feedback with the id of ${req.params.id}`));
    }
  });

  server.del('/feedbacks/:id', async (req, res, next) => {
    try {
      await Feedback.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no feedback with the id of ${req.params.id}`));
    }
  });

  server.patch('/feedbacks/:id/rate', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    try {
      const feedback = await Feedback.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200, feedback);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no feedback with the id of ${req.params.id}`));
    }
  });
};
