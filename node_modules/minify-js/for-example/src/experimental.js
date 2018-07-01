/**
 * Created by igor on 30.05.16.
 * @module str
 * @description Function for string
 */
"use strict";

const base = 'base64';

/**
 *Return string encode/decode in base64
 * @param str
 * @param decode {boolean}
 * @returns {string}
 */
exports.base64 = (str , decode) => !(decode || false)
		? new Buffer(str).toString(base)
		: new Buffer(str,base).toString('utf8');

/**
 * Return salt
 * @param {Number|null|undefined} len
 * @return {String} salt
 */
exports.salt = (len) => Math.random().toString(36).substring(2, (len || 5) + 2);

/**
 * Return string hash
 * @param str {String}
 * @param {String|null|undefined}salt
 * @param {String|null|undefined}secret
 * @param {'md5'|'sha512'|'sha256'|null|undefined}method
 * @returns {*}
 */
exports.hash = (str, salt, method , secret) => {
	let sha = require('crypto').createHmac((method || 'sha512'), (secret || 'IgorStcherbina'))
		.update(String(str), 'utf8');

	return (salt ? sha.update(salt) : sha).digest('hex');
};

/**
 * Return string, fist char in upper case.
 * @param {string}s
 * @returns {string}
 */
exports.up1stChar  = (s) => s.substring(0, 1).toUpperCase() + s.substring(1);

/**
 * Escapes special characters for RegExp
 * @param {String}text
 */
exports.regexpEscape = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');

/**
 * Replace all find word to replace word
 * @param {String}str
 * @param {String}find
 * @param {String}replace
 */
exports.fullReplace = (str, find, replace) => str.replace(new RegExp(exports.regexpEscape(find), 'g'), replace);

/**
 * Escapes special characters for html and trim unnecessary
 * @param {String}str
 * @param {Number|null|undefined}maxLength
 * @returns {*}
 */
exports.htmlEscape = (str, maxLength) => {

	if (str && str.length) {
		str = exports.fullReplace(exports.fullReplace(str, '<', '&lt;'), '>', '&gt;');

		if (maxLength)
			str = str.substr(0, maxLength);

	}

	return str;
};

/**
 * Replace spaces to only one space
 * @param  {String} str string
 * @return {String} Output string
 */
exports.oneSpace = (str) => str.replace(/\s\s+/g, ' ').trim();

/**
 * Replace all spacial symbols to space
 * @param  {String} str string
 * @return {String} Output string
 */
exports.removeSpecSymbols = (str) =>  exports.oneSpace(str.replace(/[&\/\\#,+()$~%.`'":*?!<>{}\[\]]/g, ' '));

/**
 * It generates key specified length. Used accept symbols
 * @param {String|null|undefined}accept
 * @param {Number|null|undefined}n
 * @returns {string}
 */
exports.makeKey = (n, accept) => {
	n = n || 30;
	accept = accept || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let t = '';

	for (let i = 0; i < n; i++)
		t += accept.charAt(Math.floor(Math.random() * accept.length));

	return t;

};

/**
 * Decoding URI by all methods
 * @param {String} str
 * @returns {String}
 */
exports.decodeURIUniversal = (str) => {

	try {
		str = decodeURIComponent(str);
	} catch (err) {
		try {
			str = decodeURI(str);
		} catch (err) {
			str = str || '';
		}
	}

	return str;

};

/**
 * Return value after convert string boolean to boolean.
 * if vl === 'true' then vl = true. Other vl = false
 * @param {String}vl
 * @returns {Boolean}
 */
exports.boolString = (vl) => vl === 'true';
