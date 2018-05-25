import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';


chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

export let token;
export let billId;

describe('Create a New User', () => {
  it('should return 400 for no password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnjoe@email.com'
      })
      .end((err, res) => {
        const message = {
          password: [
            'The password field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should return 400 for no username', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        password: 'asdflkj',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnjoe@email.com'
      })
      .end((err, res) => {
        const message = {
          username: [
            'The username field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should return 400 for no email', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'asdflkj'
      })
      .end((err, res) => {
        const message = {
          email: [
            'The email field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should return 400 for no First Name', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        lastName: 'Doe',
        email: 'Johndoe@email.com',
        password: 'asdflkj'
      })
      .end((err, res) => {
        const message = {
          firstName: [
            'The firstName field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should not be able to signup if no user imput details', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should return error if username is too short', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'jo',
        firstName: 'John',
        lastName: 'Doe',
        email: 'Johndoe@email.com',
        password: 'asdflkj'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should return error if password is too short', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'Johndoe@email.com',
        password: 'asdf'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should return error if username is too long', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'Johndoe@email.com',
        password: 'asdf'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should return error if first Name is too long', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'Johnjohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoe',
        lastName: 'Doe',
        email: 'Johndoe@email.com',
        password: 'asdf'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should return error if Last Name is too long', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'DoeJohnjohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoe',
        email: 'Johndoe@email.com',
        password: 'asdflkj'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
  it('should allow New User Signup', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnjoe@email.com',
        password: 'asdflkj'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.equal('Signup Successful');
        expect(res.body.data.user).to.have.a.property('username');
        expect(res.body.data.user).to.have.a.property('password');
        expect(res.body.data.user).to.have.a.property('email');
        expect(res.body.data.user).to.have.a.property('id');
        done();
      });
  });
});
describe('User Signin', () => {
  it('should return 400 for no password', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'johndoe'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        done();
      });
  });
});
it('should return 400 for no username', (done) => {
  request(app)
    .post('/api/v1/auth/login')
    .send({
      password: 'asdflkj'
    })
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.should.be.a('object'));
      done();
    });
});
it('should not be able to signin if not registered', (done) => {
  request(app)
    .post('/api/v1/auth/login')
    .send({
    })
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.should.be.a('object'));
      done();
    });
});
it('should return 400 for wrong password', (done) => {
  request(app)
    .post('/api/v1/auth/login')
    .send({
      username: 'johndoe',
      password: 'asdflkjx'
    })
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.should.be.a('object'));
      done();
    });
});


//   describe('Create a New Request', () => {
//     it('return 201 for successful', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/requests')
//         .send({
//           userId: 1,
//           title: 'Faulty Laptop',
//           category: 'Repair',
//           description: ' My laptop is not coming up. Yesterday everything was working fine but this morning I noticed the laptop was very hot and not coming up',
//           urgencyLevel: 'High',
//           date: '11/01/2019'
//         })
//         .end((err, res) => {
//           console.log(err)
//           expect(res.status).to.equal(201);
//           done();
//         });
//     });
//   });

// describe('API Integration Tests', () => {
//   describe('Get All Requests', () => {
//     it('return 200 for successful', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/requests')
//         .send()
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     });
//   });
//   describe('Gets a specific  Request', () => {
//     it('return 200 for successful', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/requests/1')
//         .send()
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     });
//     it('return 404 request is not found', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/requests/6')
//         .send()
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//     });
//   });
//   describe('Create a New Request', () => {
//     it('return 201 for successful', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/requests')
//         .send({
//           userId: 1,
//           title: 'Faulty Laptop',
//           category: 'Repair',
//           description: ' My laptop is not coming up. Yesterday everything was working fine but this morning I noticed the laptop was very hot and not coming up',
//           urgencyLevel: 'High',
//           date: '11/01/2019'
//         })
//         .end((err, res) => {
//           console.log(err)
//           expect(res.status).to.equal(201);
//           done();
//         });
//     });
//   });

//   describe('Modify a Request', () => {
//     it('return 200 for successful update', (done) => {
//       chai.request(app)
//         .put('/api/v1/users/requests/1')
//         .send({
//           title: 'Faulty Laptop',
//           category: 'Repair',
//           description: ' My laptop is not coming up. Yesterday everything was working fine but this morning I noticed the laptop was very hot and not coming up',
//           urgencyLevel: 'High'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     })
