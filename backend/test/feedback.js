process.env.NODE_ENV = 'test';

const { Mongoose } = require('mongoose');

const mongoose = new Mongoose();
const { Mockgoose } = require('mockgoose');

const mockgoose = new Mockgoose(mongoose);

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../config');
const Feedback = require('../src/models/Feedback');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);
describe('Feedbacks', () => {
  before((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(
        config.MONGODB_URI,
        { useNewUrlParser: true },
        (err) => {
          done(err);
        },
      );
    });
  });

  beforeEach((done) => {
    const feedbacks = [];
    feedbacks.push(
      new Feedback({
        employee: {
          name: 'Ricardo',
          position: 'employee',
        },
        manager: {
          name: 'Julio',
        },
        comment: 'Testing comment',
        rate: 1,
      }),
      new Feedback({
        employee: {
          name: 'Chiquinha',
          position: 'employee',
        },
        manager: {
          name: 'Jon Snow',
        },
        comment: 'Testing comment',
        rate: 3,
      }),
      new Feedback({
        employee: {
          name: 'Mario',
          position: 'employee',
        },
        manager: {
          name: 'Gina',
        },
        comment: 'Testing comment',
        rate: 5,
      }),
      new Feedback({
        employee: {
          name: 'jose',
          position: 'employee',
        },
        manager: {
          name: 'joao',
        },
        comment: 'Testing comment',
        rate: 4,
      }),
    );
    Feedback.insertMany(feedbacks).then(() => {
      done();
    }).catch(err => done(err));
  });

  describe('get all feedbacks', () => {
    it('it should GET all the feedbacks in database without filter', (done) => {
      chai.request(app)
        .get('/feedbacks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('Post feedback', () => {
    it('should post a feedback with success', (done) => {
      const feedback = {
        employee: {
          name: 'Ricardo',
          position: 'employee',
        },
        manager: {
          name: 'manager',
        },
        comment: 'This is a comment for my manager',
      };

      chai.request(app)
        .post('/feedbacks')
        .send(feedback)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('employee');
          res.body.should.have.property('manager');
          res.body.should.have.property('comment');
          done();
        });
    });
  });


  describe('get a specfic feedback by id', () => {
    it('it should GET all the feedbacks in database without filter', (done) => {
      Feedback.find({}).then((feedback) => {
        chai.request(app)
          .get(`/feedbacks/${feedback._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('employee');
            res.body.should.have.property('manager');
            res.body.should.have.property('comment');
            done();
          });
      });
    });
  });
});
