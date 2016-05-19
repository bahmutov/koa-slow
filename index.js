'use strict';

const isRegExp = require('lodash.isregexp');
const q = require('q');

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

    return function (ctx, next) {
        if (options.url) {
            if (options.url.test(ctx.url)) {
                // slow specific resoures down
                return sleep(options.delay).then(next());
            } else {
              return next();
            }
        } else {
            // slow everything down
            return sleep(options.delay).then(next());
        }
    };
};
