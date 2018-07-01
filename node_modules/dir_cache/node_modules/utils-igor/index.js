/**
 * Created by igor on 30.05.16.
 */

module.exports = function (type) {
	var have = [
		'type',
		'date',
		'arr',
		'obj',
		'str'
	];

	var module = {};

	if (!type) {
		for (var i = 0, len = have.length; i<len; ++i) {
			var tp = have[i];
			module[tp] = require('./utils/' + tp);
		}

	} else if (Array.isArray(type)) {
		for (var i = 0, len = type.length; i<len; ++i) {
			var tp = type[i];
			if (have.indexOf(tp) > -1 ) {
				module[tp] = require('./utils/' + tp);
			}
		}
	} else {
		if (have.indexOf(type) > -1 ) {
			module = require('./utils/' + type);
		}
	}

	return module;
}
