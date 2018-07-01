/**
 * Created by igor on 05.10.16.
 */
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
