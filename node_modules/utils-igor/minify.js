/**
 * Created by igor on 08.10.16.
 */

require('minify-js').dir({
	dir : 'utils',
	target : 'prod/utils'
}, (e, compress) => {

	if (e) {
		console.log('ERROR ', e);
		return done();
	}

	compress.run((e) => {
		e ? console.log('Process fail', e) : console.log('Process sucess');
	});
});
