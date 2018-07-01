<a name="module_cacheDir"></a>

## cacheDir
This module is needed for caching data.
It can search for files with certain extension in folders.
Collect file contents or contents could be through a flaw require function.
Also caches template files swigJs.

## Installation
----

```bash
npm install utils-igor
```
## example
----
```js
var dirCache = require('./index');
var async = require('async');
var ut = require('util');

async.series([

        (done) => {
            console.log('Test scan all file in folder');
            dirCache.scan({dirs : 'for-example/views1'}, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;
        },

        (done)  => {
            console.log('Test read two folders. Get only html files');
            dirCache.read({
                dirs : ['for-example/views1', 'for-example/views'],
                exts : ['.html']
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

        (done)  => {
            console.log('Test get files for swig');
            dirCache.swig({
                dirs : 'for-example/views1',
                exts : '.html'
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

        (done) => {
            console.log('Test get files for required js, json and call exporst if is function');
            dirCache.required({
                dirs : 'for-example/controllers'
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

    (done) => {
        console.log('Test get files for required js');
        dirCache.required({
            dirs : 'for-example/controllers',
            isCall : false,
            exts : '.js'
        }, (e, scan) => {

            if (e) {
                console.log('Error initail', e);
                return done();
            }

            scan.run((e, res) => {
                console.log('err ', e);
                console.log('res ', ut.inspect(res, false,  null));
                done();
            });
        }) ;

    },

    (done) => {
        console.log('Test get files for required js with call with a specified method');
        dirCache.required({
            dirs : 'for-example/controllers',
            isCall : false,
            call : 'init',
            exts : '.js'
        }, (e, scan) => {

            if (e) {
                console.log('Error initail', e);
                return done();
            }

            scan.run((e, res) => {
                console.log('err ', e);
                console.log('res ', ut.inspect(res, false,  null));
                done();
            });
        }) ;

    }

], function (e) {
    console.log('The end :)');
});

```

* [cacheDir](#module_cacheDir)
    * [module.exports](#exp_module_cacheDir--module.exports) : <code>Object</code> ⏏
        * [~Frame](#module_cacheDir--module.exports..Frame)
            * [.err(mess)](#module_cacheDir--module.exports..Frame+err) ⇒ <code>Object</code>
            * [.warn(mess, that)](#module_cacheDir--module.exports..Frame+warn)
        * [~Scan](#module_cacheDir--module.exports..Scan)
            * [new Scan(options, cb)](#new_module_cacheDir--module.exports..Scan_new)
            * [.valid(options)](#module_cacheDir--module.exports..Scan+valid)
            * [.beforeValid(options)](#module_cacheDir--module.exports..Scan+beforeValid) ⇒ <code>Object</code>
            * [.iterValid(options, k, v)](#module_cacheDir--module.exports..Scan+iterValid) ⇒ <code>boolean</code>
            * [.isCorrectExt(file)](#module_cacheDir--module.exports..Scan+isCorrectExt) ⇒ <code>boolean</code>
            * [.isAll()](#module_cacheDir--module.exports..Scan+isAll) ⇒ <code>boolean</code>
            * [.run(cb)](#module_cacheDir--module.exports..Scan+run) ⇒ <code>\*</code>
        * [~Swig](#module_cacheDir--module.exports..Swig)
            * [.run(cb)](#module_cacheDir--module.exports..Swig+run)
            * [.fileGet(dir, file, endFile)](#module_cacheDir--module.exports..Swig+fileGet)
            * [.fileToRes(pathFile, dir, file, data, cb)](#module_cacheDir--module.exports..Swig+fileToRes)
            * [.dataToRes(pathFile, dir, {Stringfile, {Stringdata, cb)](#module_cacheDir--module.exports..Swig+dataToRes) ⇒ <code>\*</code>
            * [.oneLineBreak(data)](#module_cacheDir--module.exports..Swig+oneLineBreak) ⇒ <code>string</code> &#124; <code>XML</code> &#124; <code>\*</code> &#124; <code>void</code>
        * [~Reader](#module_cacheDir--module.exports..Reader)
            * [.fileToRes(pathFile, dir, file, data, endFile)](#module_cacheDir--module.exports..Reader+fileToRes)
        * [~Reuired](#module_cacheDir--module.exports..Reuired)
            * [.beforeValid(options)](#module_cacheDir--module.exports..Reuired+beforeValid) ⇒ <code>Object</code>
            * [.fileGet(dir, file, endFile)](#module_cacheDir--module.exports..Reuired+fileGet) ⇒ <code>\*</code>
        * [~Cache](#module_cacheDir--module.exports..Cache)

<a name="exp_module_cacheDir--module.exports"></a>

### module.exports : <code>Object</code> ⏏
Exports classes

**Kind**: Exported member  
<a name="module_cacheDir--module.exports..Frame"></a>

#### module.exports~Frame
It is a frame for other classes

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  

* [~Frame](#module_cacheDir--module.exports..Frame)
    * [.err(mess)](#module_cacheDir--module.exports..Frame+err) ⇒ <code>Object</code>
    * [.warn(mess, that)](#module_cacheDir--module.exports..Frame+warn)

<a name="module_cacheDir--module.exports..Frame+err"></a>

##### frame.err(mess) ⇒ <code>Object</code>
Return error object and set flag for stop process

**Kind**: instance method of <code>[Frame](#module_cacheDir--module.exports..Frame)</code>  

| Param |
| --- |
| mess | 

<a name="module_cacheDir--module.exports..Frame+warn"></a>

##### frame.warn(mess, that)
Get text for message

**Kind**: instance method of <code>[Frame](#module_cacheDir--module.exports..Frame)</code>  

| Param | Type |
| --- | --- |
| mess | <code>String</code> | 
| that | <code>Class</code> | 

<a name="module_cacheDir--module.exports..Scan"></a>

#### module.exports~Scan
Search files in folders

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  

* [~Scan](#module_cacheDir--module.exports..Scan)
    * [new Scan(options, cb)](#new_module_cacheDir--module.exports..Scan_new)
    * [.valid(options)](#module_cacheDir--module.exports..Scan+valid)
    * [.beforeValid(options)](#module_cacheDir--module.exports..Scan+beforeValid) ⇒ <code>Object</code>
    * [.iterValid(options, k, v)](#module_cacheDir--module.exports..Scan+iterValid) ⇒ <code>boolean</code>
    * [.isCorrectExt(file)](#module_cacheDir--module.exports..Scan+isCorrectExt) ⇒ <code>boolean</code>
    * [.isAll()](#module_cacheDir--module.exports..Scan+isAll) ⇒ <code>boolean</code>
    * [.run(cb)](#module_cacheDir--module.exports..Scan+run) ⇒ <code>\*</code>

<a name="new_module_cacheDir--module.exports..Scan_new"></a>

##### new Scan(options, cb)
Set option to class and run callback


| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| cb | <code>function</code> | 

<a name="module_cacheDir--module.exports..Scan+valid"></a>

##### scan.valid(options)
Validates options

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_cacheDir--module.exports..Scan+beforeValid"></a>

##### scan.beforeValid(options) ⇒ <code>Object</code>
Hook before validates options

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_cacheDir--module.exports..Scan+iterValid"></a>

##### scan.iterValid(options, k, v) ⇒ <code>boolean</code>
Hook for iter validates options

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| k | <code>String</code> | 
| v | <code>String</code> | 

<a name="module_cacheDir--module.exports..Scan+isCorrectExt"></a>

##### scan.isCorrectExt(file) ⇒ <code>boolean</code>
Check extension file

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  

| Param | Type |
| --- | --- |
| file | <code>String</code> | 

<a name="module_cacheDir--module.exports..Scan+isAll"></a>

##### scan.isAll() ⇒ <code>boolean</code>
Check use all extension

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  
<a name="module_cacheDir--module.exports..Scan+run"></a>

##### scan.run(cb) ⇒ <code>\*</code>
Start search process

**Kind**: instance method of <code>[Scan](#module_cacheDir--module.exports..Scan)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_cacheDir--module.exports..Swig"></a>

#### module.exports~Swig
Get text swig template files and jon partial

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  

* [~Swig](#module_cacheDir--module.exports..Swig)
    * [.run(cb)](#module_cacheDir--module.exports..Swig+run)
    * [.fileGet(dir, file, endFile)](#module_cacheDir--module.exports..Swig+fileGet)
    * [.fileToRes(pathFile, dir, file, data, cb)](#module_cacheDir--module.exports..Swig+fileToRes)
    * [.dataToRes(pathFile, dir, {Stringfile, {Stringdata, cb)](#module_cacheDir--module.exports..Swig+dataToRes) ⇒ <code>\*</code>
    * [.oneLineBreak(data)](#module_cacheDir--module.exports..Swig+oneLineBreak) ⇒ <code>string</code> &#124; <code>XML</code> &#124; <code>\*</code> &#124; <code>void</code>

<a name="module_cacheDir--module.exports..Swig+run"></a>

##### swig.run(cb)
Start collected process

**Kind**: instance method of <code>[Swig](#module_cacheDir--module.exports..Swig)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_cacheDir--module.exports..Swig+fileGet"></a>

##### swig.fileGet(dir, file, endFile)
Get text files

**Kind**: instance method of <code>[Swig](#module_cacheDir--module.exports..Swig)</code>  

| Param | Type |
| --- | --- |
| dir | <code>String</code> | 
| file | <code>String</code> | 
| endFile | <code>function</code> | 

<a name="module_cacheDir--module.exports..Swig+fileToRes"></a>

##### swig.fileToRes(pathFile, dir, file, data, cb)
Write text to result

**Kind**: instance method of <code>[Swig](#module_cacheDir--module.exports..Swig)</code>  

| Param | Type |
| --- | --- |
| pathFile | <code>String</code> | 
| dir | <code>String</code> | 
| file | <code>String</code> | 
| data | <code>String</code> | 
| cb | <code>function</code> | 

<a name="module_cacheDir--module.exports..Swig+dataToRes"></a>

##### swig.dataToRes(pathFile, dir, {Stringfile, {Stringdata, cb) ⇒ <code>\*</code>
Write data to result

**Kind**: instance method of <code>[Swig](#module_cacheDir--module.exports..Swig)</code>  

| Param | Type |
| --- | --- |
| pathFile | <code>String</code> | 
| dir | <code>String</code> | 
| {Stringfile |  | 
| {Stringdata |  | 
| cb | <code>function</code> | 

<a name="module_cacheDir--module.exports..Swig+oneLineBreak"></a>

##### swig.oneLineBreak(data) ⇒ <code>string</code> &#124; <code>XML</code> &#124; <code>\*</code> &#124; <code>void</code>
Clears data from the extra line breaks

**Kind**: instance method of <code>[Swig](#module_cacheDir--module.exports..Swig)</code>  

| Param | Type |
| --- | --- |
| data | <code>String</code> | 

<a name="module_cacheDir--module.exports..Reader"></a>

#### module.exports~Reader
Get text any files

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  
<a name="module_cacheDir--module.exports..Reader+fileToRes"></a>

##### reader.fileToRes(pathFile, dir, file, data, endFile)
Write text to result

**Kind**: instance method of <code>[Reader](#module_cacheDir--module.exports..Reader)</code>  

| Param | Type |
| --- | --- |
| pathFile | <code>String</code> | 
| dir | <code>String</code> | 
| file | <code>String</code> | 
| data | <code>String</code> | 
| endFile | <code>function</code> | 

<a name="module_cacheDir--module.exports..Reuired"></a>

#### module.exports~Reuired
Get files via function require

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  

* [~Reuired](#module_cacheDir--module.exports..Reuired)
    * [.beforeValid(options)](#module_cacheDir--module.exports..Reuired+beforeValid) ⇒ <code>Object</code>
    * [.fileGet(dir, file, endFile)](#module_cacheDir--module.exports..Reuired+fileGet) ⇒ <code>\*</code>

<a name="module_cacheDir--module.exports..Reuired+beforeValid"></a>

##### reuired.beforeValid(options) ⇒ <code>Object</code>
Overwrite before valid

**Kind**: instance method of <code>[Reuired](#module_cacheDir--module.exports..Reuired)</code>  

| Param | Type |
| --- | --- |
| options | <code>String</code> | 

<a name="module_cacheDir--module.exports..Reuired+fileGet"></a>

##### reuired.fileGet(dir, file, endFile) ⇒ <code>\*</code>
Overwrite fileGet

**Kind**: instance method of <code>[Reuired](#module_cacheDir--module.exports..Reuired)</code>  

| Param | Type |
| --- | --- |
| dir | <code>String</code> | 
| file | <code>String</code> | 
| endFile | <code>function</code> | 

<a name="module_cacheDir--module.exports..Cache"></a>

#### module.exports~Cache
Create object for saving data

**Kind**: inner class of <code>[module.exports](#exp_module_cacheDir--module.exports)</code>  
