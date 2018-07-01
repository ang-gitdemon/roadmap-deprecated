<a name="module_minify-js"></a>

## minify-js
Library for minification  javascript files.  
Note: The code must be all the points with a comma  

## Installation
----

```bash
npm install minify-js
```
## example
----
```js
var minify = require('./index');
var async = require('async');
var ut = require('util');

async.series([

	(done) => {
		console.log('Test compres one file');
		minify.file({
			file : './for-example/src/experimental.js',
			dist : './for-example/experimental.min.js'
		}, (e, compress) => {

			if (e) {
				console.log('ERROR ', e);
				return done();
			}

			compress.run((e) => {
				e ? console.log('Process fail', e) : console.log('Process sucess');
				done();
			});
		});
	},
	(done) => {
		console.log('Test compres two files');
		minify.files([
			{
				file : './for-example/src/experimental.js',
				dist : './for-example/two/experimental.min.js'
			},
			{
				file : './for-example/src/experimental1.js',
				dist : './for-example/two/experimental2.min.js'
			}
		], (e, compress) => {

			if (e) {
				console.log('ERROR ', e);
				return done();
			}

			compress.run((e) => {
				e ? console.log('Process fail', e) : console.log('Process sucess');
				done();
			});
		});
	},
	(done) => {
		console.log('Test compres all files in dirs');
		minify.dir({
			dir : 'for-example/src',
			target : 'for-example/target',
			add : '.min'
		}, (e, compress) => {

			if (e) {
				console.log('ERROR ', e);
				return done();
			}

			compress.run((e) => {
				e ? console.log('Process fail', e) : console.log('Process sucess');
				done();
			});
		});
	},
	(done) => {
		console.log('Test compres lib file');
		minify.file({
			file : './lib/minify-js.js',
			dist : './lib/prod/minify-js.js'
		}, (e, compress) => {

			if (e) {
				console.log('ERROR ', e);
				return done();
			}

			compress.run((e) => {
				e ? console.log('Process fail', e) : console.log('Process sucess');
				done();
			});
		});
	}
], function (e) {
	console.log('The end :)');
});
```

* [minify-js](#module_minify-js)
    * [~Frame](#module_minify-js..Frame)
        * [.err(mess, data)](#module_minify-js..Frame+err) ⇒ <code>Object</code>
        * [.warn(mess, that)](#module_minify-js..Frame+warn)
    * [~MinifyFile](#module_minify-js..MinifyFile)
        * [.run(cb)](#module_minify-js..MinifyFile+run)
        * [.fileRead(cb)](#module_minify-js..MinifyFile+fileRead)
        * [.save(cb)](#module_minify-js..MinifyFile+save)
        * [.compess(cb)](#module_minify-js..MinifyFile+compess)
        * [.validOptions(opt, cb)](#module_minify-js..MinifyFile+validOptions) ⇒ <code>\*</code>
    * [~MinifyFiles](#module_minify-js..MinifyFiles)
        * [.validOptions(opt, cb)](#module_minify-js..MinifyFiles+validOptions) ⇒ <code>\*</code>
        * [.run(cb)](#module_minify-js..MinifyFiles+run)
    * [~MinifyFilesDir](#module_minify-js..MinifyFilesDir)
        * [.validOptions(opt, cb)](#module_minify-js..MinifyFilesDir+validOptions) ⇒ <code>\*</code>
        * [.run(cb)](#module_minify-js..MinifyFilesDir+run)

<a name="module_minify-js..Frame"></a>

### minify-js~Frame
It is a frame for other classes

**Kind**: inner class of <code>[minify-js](#module_minify-js)</code>  

* [~Frame](#module_minify-js..Frame)
    * [.err(mess, data)](#module_minify-js..Frame+err) ⇒ <code>Object</code>
    * [.warn(mess, that)](#module_minify-js..Frame+warn)

<a name="module_minify-js..Frame+err"></a>

#### frame.err(mess, data) ⇒ <code>Object</code>
Return error object and set flag for stop process

**Kind**: instance method of <code>[Frame](#module_minify-js..Frame)</code>  

| Param |
| --- |
| mess | 
| data | 

<a name="module_minify-js..Frame+warn"></a>

#### frame.warn(mess, that)
Get text for message

**Kind**: instance method of <code>[Frame](#module_minify-js..Frame)</code>  

| Param | Type |
| --- | --- |
| mess | <code>String</code> | 
| that | <code>Class</code> | 

<a name="module_minify-js..MinifyFile"></a>

### minify-js~MinifyFile
Minification one javascript file

**Kind**: inner class of <code>[minify-js](#module_minify-js)</code>  

* [~MinifyFile](#module_minify-js..MinifyFile)
    * [.run(cb)](#module_minify-js..MinifyFile+run)
    * [.fileRead(cb)](#module_minify-js..MinifyFile+fileRead)
    * [.save(cb)](#module_minify-js..MinifyFile+save)
    * [.compess(cb)](#module_minify-js..MinifyFile+compess)
    * [.validOptions(opt, cb)](#module_minify-js..MinifyFile+validOptions) ⇒ <code>\*</code>

<a name="module_minify-js..MinifyFile+run"></a>

#### minifyFile.run(cb)
Start process

**Kind**: instance method of <code>[MinifyFile](#module_minify-js..MinifyFile)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFile+fileRead"></a>

#### minifyFile.fileRead(cb)
Get file contents

**Kind**: instance method of <code>[MinifyFile](#module_minify-js..MinifyFile)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFile+save"></a>

#### minifyFile.save(cb)
Save result

**Kind**: instance method of <code>[MinifyFile](#module_minify-js..MinifyFile)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFile+compess"></a>

#### minifyFile.compess(cb)
Compress file contents

**Kind**: instance method of <code>[MinifyFile](#module_minify-js..MinifyFile)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFile+validOptions"></a>

#### minifyFile.validOptions(opt, cb) ⇒ <code>\*</code>
Check options

**Kind**: instance method of <code>[MinifyFile](#module_minify-js..MinifyFile)</code>  

| Param | Type |
| --- | --- |
| opt | <code>Object</code> | 
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFiles"></a>

### minify-js~MinifyFiles
Minification not one javascript file

**Kind**: inner class of <code>[minify-js](#module_minify-js)</code>  

* [~MinifyFiles](#module_minify-js..MinifyFiles)
    * [.validOptions(opt, cb)](#module_minify-js..MinifyFiles+validOptions) ⇒ <code>\*</code>
    * [.run(cb)](#module_minify-js..MinifyFiles+run)

<a name="module_minify-js..MinifyFiles+validOptions"></a>

#### minifyFiles.validOptions(opt, cb) ⇒ <code>\*</code>
Check options

**Kind**: instance method of <code>[MinifyFiles](#module_minify-js..MinifyFiles)</code>  

| Param | Type |
| --- | --- |
| opt | <code>Array</code> | 
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFiles+run"></a>

#### minifyFiles.run(cb)
Start process

**Kind**: instance method of <code>[MinifyFiles](#module_minify-js..MinifyFiles)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFilesDir"></a>

### minify-js~MinifyFilesDir
Minification all javascript file in folder

**Kind**: inner class of <code>[minify-js](#module_minify-js)</code>  

* [~MinifyFilesDir](#module_minify-js..MinifyFilesDir)
    * [.validOptions(opt, cb)](#module_minify-js..MinifyFilesDir+validOptions) ⇒ <code>\*</code>
    * [.run(cb)](#module_minify-js..MinifyFilesDir+run)

<a name="module_minify-js..MinifyFilesDir+validOptions"></a>

#### minifyFilesDir.validOptions(opt, cb) ⇒ <code>\*</code>
Check options
	 Format options {dir : 'source folder', targer : 'destination folder' , add : 'add to name' }

**Kind**: instance method of <code>[MinifyFilesDir](#module_minify-js..MinifyFilesDir)</code>  

| Param | Type |
| --- | --- |
| opt | <code>Object</code> | 
| cb | <code>function</code> | 

<a name="module_minify-js..MinifyFilesDir+run"></a>

#### minifyFilesDir.run(cb)
Start process

**Kind**: instance method of <code>[MinifyFilesDir](#module_minify-js..MinifyFilesDir)</code>  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

