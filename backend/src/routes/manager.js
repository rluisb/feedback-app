const errors = require('restify-errors');
const Manager = require('../models/Manager');

module.exports = (server) => {
  server.get('/managers', async (req, res, next) => {
    try {
      const managers = await Manager.find({});
      res.send(200, managers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get('/managers/:id', async (req, res, next) => {
    try {
      const manager = await Manager.findById(req.params.id);
      res.send(200, manager);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no manager with the id of ${req.params.id}`));
    }
  });


  server.post('/managers', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    const { name } = req.body;

    const manager = new Manager({
      name,
    });

    try {
      const newManager = await manager.save();
      res.send(201, newManager);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  server.put('/managers/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    try {
      const manager = await Manager.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200, manager);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no manager with the id of ${req.params.id}`));
    }
  });

  server.del('/managers/:id', async (req, res, next) => {
    try {
      await Manager.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no manager with the id of ${req.params.id}`));
    }
  });
};
