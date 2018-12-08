const errors = require('restify-errors');
const { Employee } = require('../models/Employee');

module.exports = (server) => {
  server.get('/employees', async (req, res, next) => {
    try {
      const employees = await Employee.find({});
      res.send(200, employees);
      return next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get('/employees/:id', async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.params.id);
      res.send(200, employee);
      return next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`));
    }
  });


  server.post('/employees', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    const { name, position } = req.body;

    const employee = new Employee({
      name,
      position,
    });

    try {
      const newEmployee = await employee.save();
      res.send(201, newEmployee);
      return next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  server.put('/employees/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects application/json'));
    }

    try {
      const employee = await Employee.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200, employee);
      return next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`));
    }
  });

  server.del('/employees/:id', async (req, res, next) => {
    try {
      await Employee.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      return next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no employee with the id of ${req.params.id}`));
    }
  });
};
