/**
 * Created by igor on 30.05.16.
 */

var crypto	= require('crypto');

/**
 *Return string encode/decode in base64
 * @param str
 * @param decode {boolean}
 * @returns {string}
 */
exports.base64 = function (str , decode) {
	var bs = 'base64';
	return !(decode || false)
		? new Buffer(str).toString(bs)
		: new Buffer(str,bs).toString('utf8');
};

/**
 * Return salt
 * @return {String} salt
 */
exports.salt = function (len) {
	return Math.random().toString(36).substring(2, (len || 5) + 2);
};

/**
 * Return string hash
 * @param str {String}
 * @param salt {String}
 * @param secret {String}
 * @param method {String} md5, sha512, sha256
 * @returns {*}
 */
exports.hash = function (str, salt, method, secret) {
	method = method || 'sha512';
	secret = secret || 'IgorStcherbina';

	var sha = crypto.createHmac(method, secret);

	sha.update(String(str), 'utf8');

	if (salt) {
		sha.update(salt);
	}

	return sha.digest('hex');
};

/**
 * Return string, fist char in upper case.
 * @param s
 * @returns {string}
 */
module.exports.up1stChar  = function (s) {
	return s.substring(0, 1).toUpperCase() + s.substring(1);
};

exports.regexpEscape = function (text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
};

exports.replaceAll = function (str, find, replace) {
	return str.replace(new RegExp(exports.regexpEscape(find), 'g'), replace);
};


exports.htmlEscape = function (str, maxLength) {
	if (str && str.length) {
		str = exports.replaceAll(exports.replaceAll(str, '<', '&lt;'), '>', '&gt;');

		if (maxLength) {
			str = str.substr(0, maxLength);
		}
	}

	return str;
};

/**
 * Replace spaces to only one space
 * @param  {String} str string
 * @return {String} Output string
 */
exports.oneSpace = function (str) {
	return str.replace(/\s\s+/g, ' ').trim();
};


/**
 * Replace all spacial symbols to space
 * @param  {String} str string
 * @return {String} Output string
 */
exports.removeSpecSymbols = function (str) {
	return exports.removeSpaces(str.replace(/[&\/\\#,+()$~%.`'":*?!<>{}\[\]]/g, ' '));
};


/**
 * It generates key specified length. Used accept symbols
 * @param n
 * @returns {string}
 */
exports.makeKey = function (n, accept) {
	n = n || 30;
	accept = accept || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	var t = '';

	for (var i = 0; i < n; i++) {
		t += accept.charAt(Math.floor(Math.random() * accept.length));
	}

	return t;
};


/**
 * Decoding URI by all methods
 * @param {String} str
 * @returns {String}
 */
exports.decodeURIUniversal = function (str) {

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
 * @param vl
 * @returns {Boolean}
 */
exports.boolString = function (vl) {
	return vl === 'true' ? true : false ;
};
