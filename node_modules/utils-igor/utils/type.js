/**
 * Created by igor on 30.05.16.
 * @module type
 * @description Working with types
 */
"use strict";
/**
 * Check s is string
 * @param {Mixed}s
 * @returns {boolean}
 */
exports.isString = (s) => Object.prototype.toString.call(s) === '[object String]';

/**
 * Check v is not null or undefined
 * @param {Mixed}v
 * @returns {boolean}
 */
exports.isSet = (v) => typeof v !== 'undefined' && v !== null;

/**
 * Empty function
 */
exports.noop = () => {};

/**
 * if f is function return true else false
 * @param {Function}f
 * @returns {boolean}
 */
exports.isFn = (f) => typeof f === 'function';

/**
 * Check parameter is object
 * @param {Mixed}o
 */
exports.isObj = (o) => Object.prototype.toString.call(o) === '[object Object]';

/**
 * if fn is not function change to empty function
 * @param {Function}fn
 * @returns {*}
 */
exports.beFn = (fn) => !exports.isFn(fn) ? exports.noop : fn;

/**
 * Return new instance variable v
 * @param {Mixed} v
 * @returns {string}
 */
exports.cloneVar = (v) => {
	let tp;

	if (Array.isArray(v)) {
		tp = [];
		v.forEach((el) => tp.push(el));
	} else if (exports.isNm(v))
		tp = 0 + v;
	 else if(exports.isObj(v)) {
		tp = {};
		Object.keys(v).forEach((k) => tp[k] = v[k]);
	} else if(exports.isString(v)) {
		tp = '' + v;
	}

	return tp || null;
};

/**
 * Check this value is number
 * @param {Number}n
 */
exports.isNm = (n) => typeof n === 'number';
