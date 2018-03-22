;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Index = factory();
  }
}(this, function() {
/*!
  Copyright (c) 2018 poplark.
  Licensed under the MIT License (MIT), see
  https://github.com/poplark/unique-classnames#readme
*/

function classNames() {
  let classObj = {},
    classes = [];

  let args = [].slice.call(arguments);
  args.forEach(arg => {
    if (!arg) return;

    let type = typeof arg;
    let partClasseObj = {};

    if('string' === type) {
      let names = arg.split(' ');
      names.forEach(name => {
        if(!name) return;
        partClasseObj[name] = true;
      });
    } else if('number' === type) {
      let key = '' + arg;
      partClasseObj[key] = true;
    } else if(Array.isArray(arg) && arg.length) {
      let inner = classNames.apply(null, arg);
      if(inner) {
        let names = inner.split(' ');
        names.forEach(name => {
          if(!name) return;
          partClasseObj[name] = true;
        });
      }
    } else if('object' === type) {
      for(let key in arg) {
        if(arg.hasOwnProperty(key)) {
          partClasseObj[key] = arg[key];
        }
      }
    }

    Object.assign(classObj, partClasseObj);
  })

  for(let key in classObj) {
    if(classObj.hasOwnProperty(key) && classObj[key]) {
      classes.push(key);
    }
  }
  return classes.join(' ');
}

return classNames;
}));
