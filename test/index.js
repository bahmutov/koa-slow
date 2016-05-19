'use strict';

const request = require('supertest');
const slow = require('..');
const koa = require('koa');

const msg = 'hello world';

describe('does not slow unrelated requests', () => {
  it('should respond with 200', done => {
    const app = new koa();

    app.use(slow({
      url: /\.png$/
    }));
    app.use(ctx => {
      ctx.body = msg;
    })

    request(app.listen())
    .get('/something')
    .expect(200, done);
  })
})

describe('slow() slows everything by default', () => {
  it('should respond with 200', done => {
    const app = new koa();

    app.use(slow());
    app.use(ctx => {
        ctx.body = msg;
    })

    var started = new Date();
    request(app.listen())
    .get('/something')
    .expect(200, function () {
      var finished = new Date();
      var took = finished - started;
      console.assert(took >= 1000, 'request should take more than 1000ms');
      done();
    });
  })
})

describe('slow() slows some resources, but not the others', () => {
  it('should slow down .png', done => {
    const app = new koa();

    app.use(slow({
      url: /\.png$/,
      delay: 500
    }));
    app.use(ctx => {
        ctx.body = msg;
    })

    var started = new Date();
    request(app.listen())
    .get('/something.png')
    .expect(200, function () {
      var finished = new Date();
      var took = finished - started;
      console.assert(took >= 500, 'request should take more than 500ms');
      done();
    });
  })
})