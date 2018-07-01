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
