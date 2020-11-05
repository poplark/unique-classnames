# unique-classnames

[English](./README.md) | 简体中文


一个用于将 classNames 合并的简单的工具，最重要的是它不会产生重复的 className。

## 安装

```sh
npm install unique-classnames --save
```

或

```sh
yarn add unique-classnames
```

## 用法

参数可以是 string, number, array 和 object 类型。

string:

```js
import classnames from 'unique-classnames'
classnames('foo bar', 'foo2 bar2'); // => 'foo bar foo2 bar2'
classnames('foo bar', 'foo bar2'); // => 'foo bar bar2'
```

number:

```js
import classnames from 'unique-classnames';
classnames(1, 2, 3); // => '1 2 3'
classnames(1, 2, 2, 2, 3, 3); // => '1 2 3'
```

array:

```js
import classnames from 'unique-classnames'
classnames([1, 2, 'foo', 'bar']); // => '1 2 foo bar'
classnames([1, 2, 'foo', 'bar'], ['foo', 1, 2]); // => '1 2 foo bar'
```

object:

```js
import classnames from 'unique-classnames'
classnames({foo: true, 'bar': true}); // => 'foo bar'
classnames({foo: true, 'bar': false}); // => 'foo'

classnames({foo: 1, 'bar': 1}); // => 'foo bar'
classnames({foo: 0, 'bar': 1}); // => 'bar'

classnames({'foo bar': true}); // => 'foo bar'
classnames({'foo bar': true}, {bar: false}); // => 'foo'
classnames({'foo bar': true}, {foo: false}, 'foo'); // => 'foo bar'
```

所有的 classNames 会被合并，如果相同的 className 多于一个，那么后面的会覆盖前面的，最后重复的会被去掉，仅保留一个，例如：

```js
classnames({'foo bar': true}, {foo: false}, 'foo'); // => 'foo bar'
```

{foo: false} 里的 'foo' 会覆盖掉 {'foo bar': true} 里的 'foo'，但是，最终也会被最后的那个参数 'foo' 覆盖，所以结果会是 {foo: true, bar: true} => 'foo bar'。
