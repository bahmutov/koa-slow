var request = require('supertest');
var slow = require('..');
var koa = require('koa');

var msg = 'hello world';

describe('does not slow unrelated requests', function(){
  it('should respond with 200', function(done){
    var app = koa();

    app.use(slow({
      url: /\.png$/
    }));
    app.use(function *(next){
      this.body = msg;
    })

    request(app.listen())
    .get('/something')
    .expect(200, done);
  })
})

describe('slow() slows everything by default', function(){
  it('should respond with 200', function(done){
    var app = koa();

    app.use(slow());
    app.use(function *(next){
      this.body = msg;
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

describe('slow() slows some resources, but not the others', function(){
  it('should slow down .png', function(done){
    var app = koa();

    app.use(slow({
      url: /\.png$/,
      delay: 500
    }));
    app.use(function *(next){
      this.body = msg;
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