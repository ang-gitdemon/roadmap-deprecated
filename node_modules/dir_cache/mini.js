/**
 * Created by igor on 08.10.16.
 */
"use strict";


require('minify-js').file({
	file : './lib/dir-cache.js',
	dist : './lib/prod/dir-cache.js'
}, (e, compress) => {

	if (e) {
		console.log('ERROR ', e);
		return done();
	}

	compress.run((e) => e ? console.log('Process fail', e) : console.log('Process sucess'));
});
