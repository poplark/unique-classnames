/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('assert');
const { classNames } = require('../dist');

// string
// classNames('foo bar', 'foo2 bar2'); // => 'foo bar foo2 bar2'
// classNames('foo bar', 'foo bar2'); // => 'foo bar bar2'
assert.deepStrictEqual('foo bar foo2 bar2', classNames('foo bar', 'foo2 bar2'));
assert.deepStrictEqual('foo bar bar2', classNames('foo bar', 'foo bar2'));

// number
// classNames(1, 2, 3); // => '1 2 3'
// classNames(1, 2, 2, 2, 3, 3); // => '1 2 3'
assert.deepStrictEqual('1 2 3', classNames(1, 2, 3));
assert.deepStrictEqual('1 2 3', classNames(1, 2, 2, 2, 3, 3));

// array
// classNames([1, 2, 'foo', 'bar']); // => '1 2 foo bar'
// classNames([1, 2, 'foo', 'bar'], ['foo', 1, 2]); // => '1 2 foo bar'
assert.deepStrictEqual('1 2 foo bar', classNames([1, 2, 'foo', 'bar']));
assert.deepStrictEqual('1 2 foo bar', classNames([1, 2, 'foo', 'bar'], ['foo', 1, 2]));

// object
// classNames({foo: true, 'bar': true}); // => 'foo bar'
// classNames({foo: true, 'bar': false}); // => 'foo'
// eslint-disable-next-line prettier/prettier
assert.deepStrictEqual('foo bar', classNames({ foo: true, 'bar': true }));
// eslint-disable-next-line prettier/prettier
assert.deepStrictEqual('foo', classNames({ foo: true, 'bar': false }));

// classNames({foo: 1, 'bar': 1}); // => 'foo bar'
// classNames({foo: 0, 'bar': 1}); // => 'bar'
assert.deepStrictEqual('foo bar', classNames({ foo: 1, 'bar': 1 }));
assert.deepStrictEqual('bar', classNames({ foo: 0, 'bar': 1 }));

// classNames({'foo bar': true}); // => 'foo bar'
// classNames({'foo bar': true}, {bar: false}); // => 'foo'
assert.deepStrictEqual('foo bar', classNames({ 'foo bar': true }));
assert.deepStrictEqual('foo', classNames({ 'foo bar': true }, { bar: false }));
assert.deepStrictEqual('foo bar', classNames({ 'foo bar': true }, { foo: false }, 'foo'));

console.log('test successfully');
