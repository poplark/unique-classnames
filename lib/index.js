;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Index = factory();
  }
}(this, function() {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  Copyright (c) 2018 poplark.
  Licensed under the MIT License (MIT), see
  https://github.com/poplark/unique-classnames#readme
*/

function classNames() {
  var classObj = {},
      classes = [];

  var args = [].slice.call(arguments);
  args.forEach(function (arg) {
    if (!arg) return;

    var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
    var partClasseObj = {};

    if ('string' === type) {
      var names = arg.split(' ');
      names.forEach(function (name) {
        if (!name) return;
        partClasseObj[name] = true;
      });
    } else if ('number' === type) {
      var key = '' + arg;
      partClasseObj[key] = true;
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        var _names = inner.split(' ');
        _names.forEach(function (name) {
          if (!name) return;
          partClasseObj[name] = true;
        });
      }
    } else if ('object' === type) {
      var _loop = function _loop(_key) {
        if (arg.hasOwnProperty(_key)) {
          var _names2 = _key.split(' ');
          _names2.forEach(function (name) {
            if (!name) return;
            partClasseObj[name] = arg[_key];
          });
        }
      };

      for (var _key in arg) {
        _loop(_key);
      }
    }

    Object.assign(classObj, partClasseObj);
  });

  for (var key in classObj) {
    if (classObj.hasOwnProperty(key) && classObj[key]) {
      classes.push(key);
    }
  }
  return classes.join(' ');
}
return classNames;
}));
