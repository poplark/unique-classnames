Uniq-Classnames
===========

```js
const classnames = require('uniq-classnames');
classnames('foo bar', {foo: true}); // => 'foo bar'
classnames('foo bar', {foo: false}); // => 'bar'

classnames({foo: false}, 'foo bar'); // => 'foo bar'
classnames({foo: false, bar: true}, 'foo'); // => 'foo bar'
```

