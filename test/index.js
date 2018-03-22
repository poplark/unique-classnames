const assert = require('assert');
const classnames = require('../lib/index.js');

// string
// classnames('foo bar', 'foo2 bar2'); // => 'foo bar foo2 bar2'
// classnames('foo bar', 'foo bar2'); // => 'foo bar bar2'
assert.deepEqual('foo bar foo2 bar2', classnames('foo bar', 'foo2 bar2'));
assert.deepEqual('foo bar bar2', classnames('foo bar', 'foo bar2'));

// number
// classnames(1, 2, 3); // => '1 2 3'
// classnames(1, 2, 2, 2, 3, 3); // => '1 2 3'
assert.deepEqual('1 2 3', classnames(1, 2, 3));
assert.deepEqual('1 2 3', classnames(1, 2, 2, 2, 3, 3));

// array
// classnames([1, 2, 'foo', 'bar']); // => '1 2 foo bar'
// classnames([1, 2, 'foo', 'bar'], ['foo', 1, 2]); // => '1 2 foo bar'
assert.deepEqual('1 2 foo bar', classnames([1, 2, 'foo', 'bar']));
assert.deepEqual('1 2 foo bar', classnames([1, 2, 'foo', 'bar'], ['foo', 1, 2]));

// object
// classnames({foo: true, 'bar': true}); // => 'foo bar'
// classnames({foo: true, 'bar': false}); // => 'foo'
assert.deepEqual('foo bar', classnames({foo: true, 'bar': true}));
assert.deepEqual('foo', classnames({foo: true, 'bar': false}));

// classnames({foo: 1, 'bar': 1}); // => 'foo bar'
// classnames({foo: 0, 'bar': 1}); // => 'bar'
assert.deepEqual('foo bar', classnames({foo: 1, 'bar': 1}));
assert.deepEqual('bar', classnames({foo: 0, 'bar': 1}));

// classnames({'foo bar': true}); // => 'foo bar'
// classnames({'foo bar': true}, {bar: false}); // => 'foo'
assert.deepEqual('foo bar', classnames({'foo bar': true}));
assert.deepEqual('foo', classnames({'foo bar': true}, {bar: false}));
assert.deepEqual('foo bar', classnames({'foo bar': true}, {foo: false}, 'foo'));

console.log('test successfully');