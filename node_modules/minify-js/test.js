/**
 * Created by igor on 10.10.16.
 */
"use strict";

let minify = require('./index');

describe('minify', () => {
	it('Method file', (done) => {
		minify.file({
			file : './for-example/src/experimental.js',
			dist : './for-example/experimental.min.js'
		}, (e, compress) => {

			if (e)
				throw console.log('ERR', e);

			compress.run((e) => {
				if (e)
					throw console.log('ERR', e);

				done();
			});
		});
	});

	it('Method files', (done) => {
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

			if (e)
				throw console.log('ERR', e);

			compress.run((e) => {
				if (e)
					throw console.log('ERR', e);

				done();
			});
		});
	});

	it('Method dir', (done) => {
		minify.dir({
			dir : 'for-example/src',
			target : 'for-example/target',
			add : '.min'
		}, (e, compress) => {

			if (e)
				throw console.log('ERR', e);

			compress.run((e) => {
				if (e)
					throw console.log('ERR', e);

				done();
			});
		});
	});
});

