const { describe, it, before, after } = require('mocha');
const supertest = require('supertest');
const assert = require('node:assert');

describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after((done) => app.close(done));

  describe('/contact:get', () => {
    it('should request the contact route and return HTTP status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(response.text, 'contact us page');
    });
  });

  describe('/login:post', () => {
    it('should request the login and return HTTP status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'erickwendel', password: '123' })
        .expect(200);

      assert.strictEqual(response.text, 'Log in succeeded!');
    });
  });

  describe('/login:post', () => {
    it('should request the login and return HTTP status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'marcusteste', password: '123' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, 'Log in failed!');
    });
  });

  describe('/hi:get', () => {
    it('should request and existing page and return HTTP status 404', async () => {
      const response = await supertest(app)
        .get('/hi')
        .expect(404);

      assert.strictEqual(response.text, 'not found!');
    });
  });
});
