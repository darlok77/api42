// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../app/server.js');

// Core
const server = new Server();
const app = server.app;
const should = chai.should();
let userId1="";
let userId2="";

chai.use(chaiHttp);

/**
 * GET /user
 */

describe('GET /user', () => {
  it('POST /create should create an user', done => {
    const payload = {
      "id":1,
      "name": "cyril",
      "age": 35,
      "gender": "male"
    };

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(200)
      userId1 = res.body._id

      done();
    });
  });

  it('POST /create should create an user', done => {
    const payload = {
      "id":2,
      "name": "bla",
      "age": 12,
      "gender": "male"
    };

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(200)
      userId2 = res.body._id

      done();
    });
  });

  it('POST /create should check the payload body is false', (done) => {
    const result = '{"errors":[{"parameter":"nme","value":"tutu","message":"Unexpected value."},{"parameter":"ag","value":40,"message":"Unexpected value."},{"parameter":"gende","value":"male","message":"Unexpected value."},{"parameter":"name","message":"Required value."}]}';
    const payload = {'nme': 'tutu','ag': 40,'gende': 'male'};

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(400);
      res.text.should.be.eql(result);

      done();
    });
  });

  it('GET /show:id should not get an user by false id', (done) => {
    chai.request(app)
      .get('/user/show/12')
      .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.eql('null');

      done();
    });
  });

  it('GET /show:id should have not id in url', (done) => {
    chai.request(app)
      .get('/user/show/')
      .end((err, res) => {
      res.should.have.status(404);
      res.text.should.be.eql('{"code":404,"message":"Not Found"}');

      done();
    });
  });

  it('GET /show:id should get an user result with id 1', (done) => {
    chai.request(app)
      .get('/user/show/1')
      .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.eql(`{"_id":"${userId1}","id":1,"name":"cyril","age":35,"gender":"male"}`);

      done();
    });
  });

  it('POST /search should search user 1 and 2', (done) => {
    const result = `{"data":[{"_id":"${userId1}","id":1,"name":"cyril","age":35,"gender":"male"},{"_id":"${userId2}","id":2,"name":"bla","age":12,"gender":"male"}],"code":200,"message":"Good request"}`;
    const payload = {'ids': [userId1, userId2]};

    chai.request(app)
      .post('/user/search')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.eql(result);

      done();
    });
  });

  it('POST /search should check the payload body is false', (done) => {
    const result = `{"errors":[{"parameter":"id","value":["${userId1}","1"],"message":"Unexpected value."},{"parameter":"ids","message":"Required value."}]}`;
    const payload = {'id': [userId1, '1']};

    chai.request(app)
      .post('/user/search')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(400);
      res.text.should.be.eql(result);

      done();
    });
  });

  it('PUT /update should update user', (done) => {

    const result = `{"_id":"${userId1}","id":1,"name":"cyrijjjl","age":34,"gender":"male"}`
    const payload = {"name":"cyrijjjl","age":34,"gender":"male"
                    };

    chai.request(app)
      .put('/user/update/1')
      .send(payload)
      .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.eql(result);

      done();
    });
  });

  it('DELETE /destroy/:id should delete an user', (done) => {
    const result = '{"code":200,"message":"User delete"}';

    chai.request(app)
      .delete('/user/destroy/1')
      .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.eql(result);

      done();
    });
  });

  it('DELETE /destroy/:id should have not id in url', (done) => {
    chai.request(app)
      .get('/user/destroy/')
      .end((err, res) => {
      res.should.have.status(404);
      res.text.should.be.eql('{"code":404,"message":"Not Found"}');

      done();
    });
  });
});
