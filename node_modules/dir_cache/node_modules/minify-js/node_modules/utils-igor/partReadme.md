# utils-igor
----
### Installation
----

```bash
npm install utils-igor

### Example
package.json

```json
{
  "name": "test_util",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "license": "UNLICENSED",
  "dependencies" : {
    "express" : "*",
    "async": "1.4.2",
    "utils-igor" : "*"
  }
}
```

index.js
``` js
/**
 * Created by igor on 30.05.16.
 */
/* globals process, require */

var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;


app.get('/', function (req, res) {

	// include all blocks
	var utils = require('utils-igor')();

	var arr = [2,3,4,4,4,4,5];
	var obj = {};

	res.send( 200,{
		objEmpty   : utils.obj.isEmpty(obj),
		isFunction : utils.type.isFn(obj),
		arr        : utils.arr.unique(arr)
	});

});

app.listen(port, function () {
	console.log('Example app listening on port '+ port + '!');
});
```

**Result:**
``` json
{"objEmpty":true,"isFunction":false,"arr":[2,3,4,5]}
```

To include one block change
``` js
	- var utils = require('utils-igor')();
	+ var utils = require('utils-igor')('obj');
```
To include more than one block change
``` js
	- var utils = require('utils-igor')();
	+ var utils = require('utils-igor')(['obj', 'arr']);
```

### Version
----
2.0.0
What is new ?
	- Used "use strict" mode.
	- Used minification js files.
	- Attach unit test
	- Maximum use ESMA6 within Node 4.x.x
	- Change :
	    Remove function obj.clone him be in type.cloneVar
	    Remove function date.showTime add parameter format in date.date
	    Add new function arr.check
	    And etc...
2.0.2
 Adding time constant in date module
2.0.3
 Correct function arr.mvVal

### People
----
Author and developer is [Igor Stcherbina](https://github.com/eagle7410)

### License
----
MIT

**Free Software**
