/**
 * Created by igor on 30.05.16.
 */

/**
 * Check s is string
 * @param v
 * @returns {boolean}
 */
exports.isString = function (s) {
	return Object.prototype.toString.call(s) === '[object String]';
};

/**
 * Check v is not null or undefined
 * @param v
 * @returns {boolean}
 */
exports.isSet = function (v) {
	return typeof v !== 'undefined' && v !== null;
};

/**
 *  if n is number return true else false
 * @param n
 * @returns {*}
 */
exports.isNm = function (n) {
	var r;

	if (isNaN(n)) {
		r = false;
	} else {
		n = Number(n);
		r = true;
	}

	return r;
};

/**
 * Empty function
 */
exports.noop = function () {};

/**
 * if f is function return true else false
 * @param f
 * @returns {boolean}
 */
exports.isFn = function (f) {
	return typeof f === 'function';
};


exports.isObj = function (o) {
	return Object.prototype.toString.call(o) === '[object Object]';
};

/**
 * if fn is not function change to empty function
 * @param fn
 * @returns {*}
 */
exports.beFn = function (fn) {
	return !exports.isFn(fn) ? exports.noop : fn;
};

/**
 * Return new instance variable v
 * @param v {Mixed}
 * @returns {string}
 */
module.exports.cloneVar = function (v) {
	var tp = null;

	if (Array.isArray(v)) {
		tp = [];
		v.forEach(function (el) {
			tp.push(el);
		});
	} else if (exports.isNm(v)) {
		tp = 0 + v;
	} else if(exports.isObj(v)) {
		tp = {};
		Object.keys(v).forEach(function (k) {
			tp[k] = v[k];
		});
	} else if(exports.isString(v)) {
		tp = '' + v;
	}

	return tp;
};
