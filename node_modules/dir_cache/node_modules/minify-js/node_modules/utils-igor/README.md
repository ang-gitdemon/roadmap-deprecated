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

## Modules

<dl>
<dt><a href="#module_arr">arr</a></dt>
<dd><p>Function for array</p>
</dd>
<dt><a href="#module_date">date</a></dt>
<dd><p>Function for date</p>
</dd>
<dt><a href="#module_obj">obj</a></dt>
<dd><p>Function for object</p>
</dd>
<dt><a href="#module_str">str</a></dt>
<dd><p>Function for string</p>
</dd>
<dt><a href="#module_type">type</a></dt>
<dd><p>Working with types</p>
</dd>
</dl>

<a name="module_arr"></a>

## arr
Function for array


* [arr](#module_arr)
    * [.mvVal](#module_arr.mvVal)
        * [new exports.mvVal(arr, value)](#new_module_arr.mvVal_new)
    * [.check(arr)](#module_arr.check)
    * [.sortNumber(a, b)](#module_arr.sortNumber) ⇒ <code>number</code>
    * [.share(arr1, arr2)](#module_arr.share) ⇒ <code>Array</code>
    * [.diff(arr1, arr2)](#module_arr.diff) ⇒ <code>Array</code>
    * [.unique(arr)](#module_arr.unique)
    * [.sum()](#module_arr.sum) ⇒ <code>Number</code>
    * [.avg(a)](#module_arr.avg) ⇒ <code>number</code>
    * [.urls(arr)](#module_arr.urls) ⇒ <code>Array</code>

<a name="module_arr.mvVal"></a>

### arr.mvVal
**Kind**: static class of <code>[arr](#module_arr)</code>  
<a name="new_module_arr.mvVal_new"></a>

#### new exports.mvVal(arr, value)
Delete all elements whith specified value


| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | массив для очистки |
| value | <code>\*</code> | значение |

<a name="module_arr.check"></a>

### arr.check(arr)
Check parameter be array. if not return empty array

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| arr | <code>\*</code> | 

<a name="module_arr.sortNumber"></a>

### arr.sortNumber(a, b) ⇒ <code>number</code>
By default the sort method sorts elements alphabetically.
To sort numerically just add a new method which handles numeric sorts
e.g. [11, 1, 2].sort(utils.sortNumber);

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| a | <code>Number</code> | 
| b | <code>Number</code> | 

<a name="module_arr.share"></a>

### arr.share(arr1, arr2) ⇒ <code>Array</code>
Return share part of the array

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param |
| --- |
| arr1 | 
| arr2 | 

<a name="module_arr.diff"></a>

### arr.diff(arr1, arr2) ⇒ <code>Array</code>
Return different part of the array

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| arr1 | <code>Array</code> | 
| arr2 | <code>Array</code> | 

<a name="module_arr.unique"></a>

### arr.unique(arr)
Clear repeat values

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> | 

<a name="module_arr.sum"></a>

### arr.sum() ⇒ <code>Number</code>
Sum of array elements

**Kind**: static method of <code>[arr](#module_arr)</code>  
<a name="module_arr.avg"></a>

### arr.avg(a) ⇒ <code>number</code>
Return average elements array

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| a | <code>Array</code> | 

<a name="module_arr.urls"></a>

### arr.urls(arr) ⇒ <code>Array</code>
Return array. When element is url collect from specified array

**Kind**: static method of <code>[arr](#module_arr)</code>  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> | 

<a name="module_date"></a>

## date
Function for date


* [date](#module_date)
    * _static_
        * [.ts](#module_date.ts) : <code>Object</code>
        * [.time(ts)](#module_date.time)
        * [.date(shiftDays, ts, format)](#module_date.date) ⇒ <code>string</code>
        * [.dateTime(shiftDays, ts, format)](#module_date.dateTime)
        * [.tsToSec(ts, up)](#module_date.tsToSec)
        * [.tsToMin(ts, up)](#module_date.tsToMin)
        * [.secToTs(sec)](#module_date.secToTs)
        * [.minToTs(min)](#module_date.minToTs)
    * _inner_
        * [~unix(ts)](#module_date..unix)
        * [~round(number, up)](#module_date..round)

<a name="module_date.ts"></a>

### date.ts : <code>Object</code>
Time constant in milliseconds

**Kind**: static property of <code>[date](#module_date)</code>  
<a name="module_date.time"></a>

### date.time(ts)
Get time string

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

**Example**  
```js
'11:40:46'
```
<a name="module_date.date"></a>

### date.date(shiftDays, ts, format) ⇒ <code>string</code>
Get date string

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| shiftDays | <code>Number</code> &#124; <code>null</code> | 
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| format | <code>string</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

**Example**  
```js
date() => '2014-11-30'
```
**Example**  
```js
date(null, null, 'd-m-y') => '30-11-2014'
```
<a name="module_date.dateTime"></a>

### date.dateTime(shiftDays, ts, format)
* Get date time string

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| shiftDays | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| format | <code>String</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

**Example**  
```js
'2014-11-30 11:40:46'
```
**Example**  
```js
dateTime() this work
```
<a name="module_date.tsToSec"></a>

### date.tsToSec(ts, up)
unix-time to seconds

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| up | <code>boolean</code> &#124; <code>null</code> | 

**Example**  
```js
1417323330
```
<a name="module_date.tsToMin"></a>

### date.tsToMin(ts, up)
unix-time to minutes

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| up | <code>boolean</code> &#124; <code>null</code> | 

**Example**  
```js
23622056
```
<a name="module_date.secToTs"></a>

### date.secToTs(sec)
seconds to unix-time

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| sec | <code>Number</code> | 

**Example**  
```js
1417323330
```
<a name="module_date.minToTs"></a>

### date.minToTs(min)
minutes to unix-time

**Kind**: static method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| min | <code>Number</code> | 

**Example**  
```js
23622056
```
<a name="module_date..unix"></a>

### date~unix(ts)
Return date (now or by unixTime).

**Kind**: inner method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| ts | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

<a name="module_date..round"></a>

### date~round(number, up)
Be round up or down

**Kind**: inner method of <code>[date](#module_date)</code>  

| Param | Type |
| --- | --- |
| number | <code>Number</code> | 
| up | <code>boolean</code> &#124; <code>null</code> | 

<a name="module_obj"></a>

## obj
Function for object


* [obj](#module_obj)
    * _static_
        * [.arrToObjByKey(arr, prop, fnIterProp)](#module_obj.arrToObjByKey) ⇒ <code>Object</code>
        * [.keysChange(obj, keys)](#module_obj.keysChange) ⇒ <code>Object</code>
        * [.sort(obj, down)](#module_obj.sort) ⇒ <code>Object</code>
        * [.propInc(obj, prop, byVal)](#module_obj.propInc)
        * [.beInObj(ob, prop, def)](#module_obj.beInObj)
        * [.pathCreate(obj, path, def)](#module_obj.pathCreate)
        * [.isPathExist(obj, path)](#module_obj.isPathExist) ⇒ <code>Boolean</code>
        * [.pathVal(obj, path)](#module_obj.pathVal) ⇒ <code>\*</code>
        * [.pathMv(obj, path)](#module_obj.pathMv) ⇒ <code>\*</code>
        * [.urlParams(obj)](#module_obj.urlParams) ⇒ <code>string</code>
        * [.ext(obj, add)](#module_obj.ext) ⇒ <code>\*</code>
        * [.getPropToArr(arObj, prop)](#module_obj.getPropToArr) ⇒ <code>Array</code>
        * [.propToArr(obj)](#module_obj.propToArr) ⇒ <code>Array</code>
        * [.each(obj, fn, fnSort)](#module_obj.each)
        * [.isEmpty(obj)](#module_obj.isEmpty) ⇒ <code>boolean</code>
        * [.beRound(ob, prop, round)](#module_obj.beRound)
    * _inner_
        * [~isObj(obj)](#module_obj..isObj) ⇒ <code>boolean</code>
        * [~isSet(v)](#module_obj..isSet)

<a name="module_obj.arrToObjByKey"></a>

### obj.arrToObjByKey(arr, prop, fnIterProp) ⇒ <code>Object</code>
Return object. When keys is specified property, value is object from array objects

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> | 
| prop | <code>String</code> | 
| fnIterProp | <code>function</code> | 

<a name="module_obj.keysChange"></a>

### obj.keysChange(obj, keys) ⇒ <code>Object</code>
Get properties from obj by keys

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> |  |
| keys | <code>\*</code> | [{keyOld : keyNew,...}] |

<a name="module_obj.sort"></a>

### obj.sort(obj, down) ⇒ <code>Object</code>
Return new object when keys be sort

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| down | <code>Boolean</code> | 

<a name="module_obj.propInc"></a>

### obj.propInc(obj, prop, byVal)
Increment object property to the specified value

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| prop | <code>String</code> | 
| byVal | <code>Number</code> | 

<a name="module_obj.beInObj"></a>

### obj.beInObj(ob, prop, def)
Check is set object. If not, it creates it with the specified value

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| ob | <code>Object</code> | 
| prop | <code>String</code> | 
| def | <code>Object</code> | 

<a name="module_obj.pathCreate"></a>

### obj.pathCreate(obj, path, def)
Create path in object

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> | 
| path | <code>Array</code> &#124; <code>String</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| def | <code>\*</code> | 

<a name="module_obj.isPathExist"></a>

### obj.isPathExist(obj, path) ⇒ <code>Boolean</code>
Check exist path in object

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| path | <code>\*</code> | 

<a name="module_obj.pathVal"></a>

### obj.pathVal(obj, path) ⇒ <code>\*</code>
Get element by path in object

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| path | <code>String</code> | 

<a name="module_obj.pathMv"></a>

### obj.pathMv(obj, path) ⇒ <code>\*</code>
Delete element by path in object

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| path | <code>String</code> | 

<a name="module_obj.urlParams"></a>

### obj.urlParams(obj) ⇒ <code>string</code>
Serialize object to url params

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_obj.ext"></a>

### obj.ext(obj, add) ⇒ <code>\*</code>
Properties in add object adding to obj or if properties not exits create him

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| add | <code>Object</code> | 

<a name="module_obj.getPropToArr"></a>

### obj.getPropToArr(arObj, prop) ⇒ <code>Array</code>
Get property from array objects

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| arObj | <code>Array</code> | 
| prop | <code>String</code> | 

<a name="module_obj.propToArr"></a>

### obj.propToArr(obj) ⇒ <code>Array</code>
Collect object property to array

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_obj.each"></a>

### obj.each(obj, fn, fnSort)
ForEach for Object fn(key, val) and sort keys by fnSort

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| fn | <code>function</code> | 
| fnSort | <code>function</code> | 

<a name="module_obj.isEmpty"></a>

### obj.isEmpty(obj) ⇒ <code>boolean</code>
if o is object return true else false

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_obj.beRound"></a>

### obj.beRound(ob, prop, round)
If the object property exists, its rounded

**Kind**: static method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| ob | <code>Object</code> | 
| prop | <code>String</code> | 
| round | <code>Number</code> | 

<a name="module_obj..isObj"></a>

### obj~isObj(obj) ⇒ <code>boolean</code>
Check is object

**Kind**: inner method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_obj..isSet"></a>

### obj~isSet(v)
Check v be no undefined or null

**Kind**: inner method of <code>[obj](#module_obj)</code>  

| Param | Type |
| --- | --- |
| v | <code>\*</code> | 

<a name="module_str"></a>

## str
Function for string


* [str](#module_str)
    * [.base64(str, decode)](#module_str.base64) ⇒ <code>string</code>
    * [.salt(len)](#module_str.salt) ⇒ <code>String</code>
    * [.hash(str, salt, secret, method)](#module_str.hash) ⇒ <code>\*</code>
    * [.up1stChar(s)](#module_str.up1stChar) ⇒ <code>string</code>
    * [.regexpEscape(text)](#module_str.regexpEscape)
    * [.fullReplace(str, find, replace)](#module_str.fullReplace)
    * [.htmlEscape(str, maxLength)](#module_str.htmlEscape) ⇒ <code>\*</code>
    * [.oneSpace(str)](#module_str.oneSpace) ⇒ <code>String</code>
    * [.removeSpecSymbols(str)](#module_str.removeSpecSymbols) ⇒ <code>String</code>
    * [.makeKey(accept, n)](#module_str.makeKey) ⇒ <code>string</code>
    * [.decodeURIUniversal(str)](#module_str.decodeURIUniversal) ⇒ <code>String</code>
    * [.boolString(vl)](#module_str.boolString) ⇒ <code>Boolean</code>

<a name="module_str.base64"></a>

### str.base64(str, decode) ⇒ <code>string</code>
Return string encode/decode in base64

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| str |  | 
| decode | <code>boolean</code> | 

<a name="module_str.salt"></a>

### str.salt(len) ⇒ <code>String</code>
Return salt

**Kind**: static method of <code>[str](#module_str)</code>  
**Returns**: <code>String</code> - salt  

| Param | Type |
| --- | --- |
| len | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

<a name="module_str.hash"></a>

### str.hash(str, salt, secret, method) ⇒ <code>\*</code>
Return string hash

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 
| salt | <code>String</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| secret | <code>String</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| method | <code>&#x27;md5&#x27;</code> &#124; <code>&#x27;sha512&#x27;</code> &#124; <code>&#x27;sha256&#x27;</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

<a name="module_str.up1stChar"></a>

### str.up1stChar(s) ⇒ <code>string</code>
Return string, fist char in upper case.

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 

<a name="module_str.regexpEscape"></a>

### str.regexpEscape(text)
Escapes special characters for RegExp

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| text | <code>String</code> | 

<a name="module_str.fullReplace"></a>

### str.fullReplace(str, find, replace)
Replace all find word to replace word

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 
| find | <code>String</code> | 
| replace | <code>String</code> | 

<a name="module_str.htmlEscape"></a>

### str.htmlEscape(str, maxLength) ⇒ <code>\*</code>
Escapes special characters for html and trim unnecessary

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 
| maxLength | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

<a name="module_str.oneSpace"></a>

### str.oneSpace(str) ⇒ <code>String</code>
Replace spaces to only one space

**Kind**: static method of <code>[str](#module_str)</code>  
**Returns**: <code>String</code> - Output string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | string |

<a name="module_str.removeSpecSymbols"></a>

### str.removeSpecSymbols(str) ⇒ <code>String</code>
Replace all spacial symbols to space

**Kind**: static method of <code>[str](#module_str)</code>  
**Returns**: <code>String</code> - Output string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | string |

<a name="module_str.makeKey"></a>

### str.makeKey(accept, n) ⇒ <code>string</code>
It generates key specified length. Used accept symbols

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| accept | <code>String</code> &#124; <code>null</code> &#124; <code>undefined</code> | 
| n | <code>Number</code> &#124; <code>null</code> &#124; <code>undefined</code> | 

<a name="module_str.decodeURIUniversal"></a>

### str.decodeURIUniversal(str) ⇒ <code>String</code>
Decoding URI by all methods

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="module_str.boolString"></a>

### str.boolString(vl) ⇒ <code>Boolean</code>
Return value after convert string boolean to boolean.
if vl === 'true' then vl = true. Other vl = false

**Kind**: static method of <code>[str](#module_str)</code>  

| Param | Type |
| --- | --- |
| vl | <code>String</code> | 

<a name="module_type"></a>

## type
Working with types


* [type](#module_type)
    * [.isString(s)](#module_type.isString) ⇒ <code>boolean</code>
    * [.isSet(v)](#module_type.isSet) ⇒ <code>boolean</code>
    * [.noop()](#module_type.noop)
    * [.isFn(f)](#module_type.isFn) ⇒ <code>boolean</code>
    * [.isObj(o)](#module_type.isObj)
    * [.beFn(fn)](#module_type.beFn) ⇒ <code>\*</code>
    * [.cloneVar(v)](#module_type.cloneVar) ⇒ <code>string</code>
    * [.isNm(n)](#module_type.isNm)

<a name="module_type.isString"></a>

### type.isString(s) ⇒ <code>boolean</code>
Check s is string

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| s | <code>Mixed</code> | 

<a name="module_type.isSet"></a>

### type.isSet(v) ⇒ <code>boolean</code>
Check v is not null or undefined

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| v | <code>Mixed</code> | 

<a name="module_type.noop"></a>

### type.noop()
Empty function

**Kind**: static method of <code>[type](#module_type)</code>  
<a name="module_type.isFn"></a>

### type.isFn(f) ⇒ <code>boolean</code>
if f is function return true else false

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 

<a name="module_type.isObj"></a>

### type.isObj(o)
Check parameter is object

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| o | <code>Mixed</code> | 

<a name="module_type.beFn"></a>

### type.beFn(fn) ⇒ <code>\*</code>
if fn is not function change to empty function

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_type.cloneVar"></a>

### type.cloneVar(v) ⇒ <code>string</code>
Return new instance variable v

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| v | <code>Mixed</code> | 

<a name="module_type.isNm"></a>

### type.isNm(n)
Check this value is number

**Kind**: static method of <code>[type](#module_type)</code>  

| Param | Type |
| --- | --- |
| n | <code>Number</code> | 


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
