```js
var koa = require('koa');
var slow = require('koa-slow');
var app = koa()
    .use(slow({
        url: /\.jpg$/i,
        delay: 2000
    }))
...
app.listen(4000);
$ curl http://localhost:4000/index.html  // 1 ms
$ curl http://localhost:4000/foto.jpg    // 2001 ms
```

Works with [Koa](http://koajs.com/) server.
If you need same feature for
[Connect](http://www.senchalabs.org/connect/) or
[Express](http://expressjs.com/) use
[connect-slow](https://github.com/bahmutov/connect-slow).