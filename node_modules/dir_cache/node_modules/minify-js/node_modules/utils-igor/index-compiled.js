/**
 * Created by igor on 30.05.16.
 */

"use strict";
/*globals NODE_ENV, process */
/**
 * Logic includes modules
 * @param {Array|String|undefined|null}type
 * @returns {{}}
 */

const attach = process.env.NODE_ENV === 'dev' ? '' : 'prod/';

module.exports = type => {
	let have = ['type', 'date', 'arr', 'obj', 'str'];

	let module = {};
	let i = 0;

	if (!type) {
		for (; i < have.length; i++) module[have[i]] = require(`./${ attach }utils/${ have[i] }`);
	} else if (Array.isArray(type)) {
		for (; i < type.length; i++) if (~have.indexOf(type[i])) module[type[i]] = require(`./${ attach }utils/${ type[i] }`);
	} else if (~have.indexOf(type)) module = require(`./${ attach }utils/${ type }`);

	return module;
};

//# sourceMappingURL=index-compiled.js.map