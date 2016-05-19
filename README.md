# koa-slow

> Delaying responses for resources by URL RegExp, for Koa server

[![NPM][koa-slow-icon] ][koa-slow-url]

[![Build status][koa-slow-ci-image] ][koa-slow-ci-url]
[![dependencies][koa-slow-dependencies-image] ][koa-slow-dependencies-url]
[![devdependencies][koa-slow-devdependencies-image] ][koa-slow-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]

[koa-slow-icon]: https://nodei.co/npm/koa-slow.png?downloads=true
[koa-slow-url]: https://npmjs.org/package/koa-slow
[koa-slow-ci-image]: https://travis-ci.org/bahmutov/koa-slow.png?branch=master
[koa-slow-ci-url]: https://travis-ci.org/bahmutov/koa-slow
[koa-slow-dependencies-image]: https://david-dm.org/bahmutov/koa-slow.png
[koa-slow-dependencies-url]: https://david-dm.org/bahmutov/koa-slow
[koa-slow-devdependencies-image]: https://david-dm.org/bahmutov/koa-slow/dev-status.png
[koa-slow-devdependencies-url]: https://david-dm.org/bahmutov/koa-slow#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release



**note:** version 2.x supports koa v2. Use previous version with koa v1.

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


## Why?

Controlled server-side delays allow to debug and polish
website behavior, see
[Give browser a chance](http://bahmutov.calepin.co/give-browser-a-chance.html)

install:

```
npm install koa-slow --save
```

slow down every requst by 1 second (default delay value)

```js
var slow = require('koa-slow');
var app = require('koa')();
app.use(slow());
...
```

slow down JPEG images by 500ms,
let everything else be served as quick as possible

```js
var slow = require('koa-slow');
var app = require('koa')();
app.use(slow({
    url: /\.[jpg|jpeg]$/i,
    delay: 500
}))
...
```

slow down JPEG images by 1000ms, slow down JavaScript files by 100ms

```js
var slow = require('koa-slow');
var app = require('koa')();
app.use(slow({
    url: /\.[jpg|jpeg]$/i,
    delay: 1000
}))
.use(slow({
    url: /\.js$/i,
    delay: 100
}))
...
```

#### Related projects

* [connect-slow](https://github.com/bahmutov/connect-slow),
same functionality for Connect / Express servers.



### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/koa-slow/issues) on Github



## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.



