var isRegExp = require('lodash.isregexp');
var q = require('q');

module.exports = slow;

function sleep(delay) {
  var defer = q.defer();
  setTimeout(function () {
    defer.resolve();
  }, delay);
  return defer.promise;
}

function slow(options) {
  options = options || {};
  if (options.url) {
    if (!isRegExp(options.url)) {
      throw new Error('url should be a RegExp to check request url, not ' + options.url);
    }
  }

  options.delay = options.delay || 1000;
  if (options.delay < 1) {
    throw new Error('Delay should be positive number, not ' + options.delay);
  }

  return function *(next) {
    if (options.url) {
      if (options.url.test(this.url)) {
        // slow specific resoures down
        yield sleep(options.delay);
        yield next;
      } else {
        yield next;
      }
    } else {
      // slow everything down
      yield sleep(options.delay);
      yield next;
    }
  };
};