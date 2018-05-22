import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('API Integration Tests', () => {
  describe('Get All Requests', () => {
    it('return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('Gets a specific  Request', () => {
    it('return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/1')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('return 404 request is not found', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/6')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('Create a New Request', () => {
    it('return 201 for successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          userId: 1,
          title: 'Faulty Laptop',
          category: 'Repair',
          description: ' My laptop is not coming up. Yesterday everything was working fine but this morning I noticed the laptop was very hot and not coming up',
          urgencyLevel: 'High',
          date: '11/01/2019'
        })
        .end((err, res) => {
          console.log(err)
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Modify a Request', () => {
    it('return 200 for successful update', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/1')
        .send({
          title: 'Faulty Laptop',
          category: 'Repair',
          description: ' My laptop is not coming up. Yesterday everything was working fine but this morning I noticed the laptop was very hot and not coming up',
          urgencyLevel: 'High'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
