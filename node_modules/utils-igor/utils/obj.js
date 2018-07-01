/**
 * Created by igor on 30.05.16.
 * @module obj
 * @description Function for object
 */

"use strict";

/**
 * Return object. When keys is specified property, value is object from array objects
 * @param {Array}arr
 * @param {String}prop
 * @param {Function}fnIterProp
 * @returns {{}}
 */
exports.arrToObjByKey = (arr, prop, fnIterProp) => {
	var obj = {};

	if (!Array.isArray(arr) || !prop)
		return obj;

	for (let i = 0; i< arr.length; ++i) {
		let el = arr[i];

		if (el[prop]) {
			let key = el[prop];

			if (typeof fnIterProp === 'function')
				key = fnIterProp(key, el);

			obj[key] = el;
		}
	}

	return obj;
};

/**
 * Get properties from obj by keys
 * @param {object} obj
 * @param {*} keys [{keyOld : keyNew,...}]
 * @returns {{}}
 */
exports.keysChange = (obj, keys) => {
	let r = {},
		arKey,
		isNewkey = false;

	if (isObj(keys)) {
		arKey = Object.keys(keys);
		isNewkey = true;
	} else
		 arKey = keys;


	if (obj && Array.isArray(arKey)) {
		for (let i = 0; i<arKey.length; ++i) {
			let k = arKey[i];

			if (obj[k] || obj[k] === false)
				r[isNewkey ? keys[k] : k ] = obj[k];

		}
	}

	return r;
};

/**
 * Return new object when keys be sort
 * @param {Object}obj
 * @param {Boolean}down
 * @returns {{}}
 */
exports.sort = (obj, down) => {
	down = down || false;

	let r = {},
		keys = Object.keys(obj).sort();

	if (down)
		keys.reverse();


	for (let i = 0; i<keys.length; i++)
		r[keys[i]] = obj[keys[i]];

	return r;

};

/**
 * Increment object property to the specified value
 * @param {Object} obj
 * @param {String} prop
 * @param {Number} byVal
 * */
exports.propInc = (obj, prop, byVal) => {
	let val = byVal || 1;

	val = isNaN(val) ? 1 : Number(val);

	if (!isObj(obj))
		return obj;

	if (obj[prop] === undefined)
		obj[prop] = val;
	 else {

		if (isNaN(obj[prop]))
			return obj;
		else
			 obj[prop] = Number(obj[prop]);

		obj[prop] += val;
	}

	return obj;
};

/**
 * Check is set object. If not, it creates it with the specified value
 * @param {Object}ob
 * @param {String}prop
 * @param {Object}def
 */
exports.beInObj = (ob, prop, def) => {
	if (def === undefined) def = {};

	if (ob && !ob[prop]) ob[prop] = def;

	return ob;
};

/**
 * Create path in object
 * @param {Object|Array|String}obj
 * @param {Array|String|null|undefined}path
 * @param {*}def
 */
exports.pathCreate = function(obj, path, def) {

	if (!isSet(path)) {
		path = obj;
		obj  = {};
	}

	if (typeof path === 'string')
		path = path.split('.');

	let b = obj;
	let len = path.length;

	if (len === 1)
		exports.beInObj(b, path[0], def);
	 else if (len > 1) {

		len--;

		for (let i = 0; i < len; i++) {
			exports.beInObj(b, path[i]);
			b = b[path[i]];
		}

		exports.beInObj(b, path[len], def);
	}

	return obj;
};

/**
 * Check exist path in object
 * @param {Object}obj
 * @param {*} path
 * @returns {Boolean}
 */
exports.isPathExist = (obj, path) => {
	let arPath = [];

	if (typeof path === 'string')
		arPath = path.split('.');
	 else if (Array.isArray(path))
		 arPath = path;


	if (!arPath.length) return true;
	let p = arPath.shift();
	return obj.hasOwnProperty(p) || obj[p] !== undefined ? exports.isPathExist(obj[p], arPath) : false;
};

/**
 * Get element by path in object
 * @param {Object}obj
 * @param {String}path
 * @returns {*}
 */
exports.pathVal = (obj, path) => {

	if (!isSet(obj) || !isObj(obj))
		return undefined;

	let r = obj;

	if (typeof path === 'string')
		path = path.split('.');

	for (let i = 0; i<path.length; ++i) {

		let next = path[i];

		if (r[next])
			r = r[next];
		 else
			 return undefined;
	}

	return r;
};

/**
 * Delete element by path in object
 * @param {Object}obj
 * @param {String}path
 * @returns {*}
 */
exports.pathMv = (obj, path) => {

	if (typeof path === 'string')
		 path = path.split('.');

	if (
		!isSet(obj) ||
		!isObj(obj) ||
		!exports.isPathExist(obj, [].concat(path))
		)
		return null;


	path = path.map( (el) => `["${el}"]` );

	eval(`delete obj${path.join('')}`);

	return true;
};

/**
 * Serialize object to url params
 * @param {Object} obj
 * @returns {string}
 */
exports.urlParams = (obj) => {
	let arr = [];

	exports.each(obj, (key, val) => arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val)) );

	return arr.join('&');
};

/**
 * Properties in add object adding to obj or if properties not exits create him
 * @param {Object}obj
 * @param {Object}add
 * @returns {*}
 */
exports.ext = (obj, add) => {
	let j = (obj, op) => {
		exports.each(op, function (k, val) {
			if (isObj(val))
				if (!obj[k])
					obj[k] = val;
				 else
					 j(obj[k], val);

			 else
				 obj[k] = val;

		});
	};

	obj = obj || {};

	if (add)
		j(obj, add);

	return obj;
};

/**
 * Check is object
 * @param {Object}obj
 * @returns {boolean}
 */
let isObj = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

/**
 * Check v be no undefined or null
 * @param {*}v
 */
let isSet = (v) => typeof v !== 'undefined' && v !== null;

/**
 * Get property from array objects
 * @param {Array}arObj
 * @param {String}prop
 * @returns {Array}
 */
exports.getPropToArr = (arObj, prop) => {

	let r = [];

	if (!Array.isArray(arObj)) arObj = [arObj];

	for (let i = 0; i<arObj.length; ++i)
		if (isSet(arObj[i][prop]))
			r.push(arObj[i][prop]);

	return r;
};

/**
 * Collect object property to array
 * @param {Object}obj
 * @returns {Array}
 */
exports.propToArr = (obj) => {
	let arr = [];

	if (!isObj(obj))
		return arr;

	exports.each(obj, (key) => arr.push(obj[key]));

	return arr;
};

/**
 * ForEach for Object fn(key, val) and sort keys by fnSort
 * @param {Object}obj
 * @param {Function}fn
 * @param {Function}fnSort
 */
exports.each = (obj, fn, fnSort) => {

	if (isObj(obj)) {
		fn = typeof fn !== 'function' ? function(){} : fn;

		let keys = Object.keys(obj);

		if (fnSort) {
			keys = keys.sort(fnSort);
		}

		for (let i = 0, len = keys.length; i<len; ++i)
			fn(keys[i], obj[keys[i]]);

	}
};

/**
 * if o is object return true else false
 * @param {Object}obj
 * @returns {boolean}
 */
exports.isEmpty = (obj) => !isObj(obj) || !Object.keys(obj).length;

/**
 * If the object property exists, its rounded
 * @param {Object}ob
 * @param {String}prop
 * @param {Number}round
 */
exports.beRound = (ob, prop, round) => {
	if (ob[prop]) ob[prop] = isNaN(ob[prop]) ? 0 :  Number(parseFloat(Number(ob[prop])).toFixed(round));
	return ob;
};
