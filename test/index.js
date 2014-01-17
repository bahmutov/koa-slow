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
      yield next;
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
      yield next;
      this.body = msg;
    })

    request(app.listen())
    .get('/something')
    .expect(200, done);
  })
})