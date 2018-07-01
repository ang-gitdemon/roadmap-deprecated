/**
 * Created by igor on 30.05.16.
 */

/**
 * Return object. When keys is specified property, value is object from array objects
 * @param arr
 * @param prop
 * @param fn
 * @returns {{}}
 */
exports.arrToObjByKey = function (arr, prop, fnIterProp) {
	var obj = {};

	for (var i = 0, len = arr.length; i<len; ++i) {
		var el = arr[i];

		if (el[prop]) {
			var key = el[prop];

			if (typeof fnIterProp === 'function') {
				key = fnIterProp(key);
			}

			obj[key] = el;
		}
	}

	return obj;
};

/**
 * Get properties from obj by keys
 * @param obj
 * @param keys {Mixed} {keyOld : keyNew,...}
 * @returns {{}}
 */
exports.keysChange = function (obj, keys) {
	var r = {};
	var arKey;
	var isNewkey = false;

	if (isObj(keys)) {
		arKey = Object.keys(keys);
		isNewkey = true;
	} else {
		arKey = keys;
	}

	if (obj && Array.isArray(arKey)) {
		for (var i = 0, len = arKey.length; i<len; ++i) {
			var k = arKey[i];

			if (obj[k] || obj[k] === false) {
				r[isNewkey ? keys[k] : k ] = obj[k];
			}

		}
	}

	return r;
};

/**
 * Return new object when keys be sort
 * @param obj
 * @returns {{}}
 */
exports.sort = function (obj, down) {
	down = down || false;

	var r = {};
	var keys = Object.keys(obj).sort();

	if (down) {
		keys.reverse();
	}

	for (var i = 0, len = keys.length; i<len; ++i) {
		var k = keys[i];
		r[k] = obj[k];
	}

	return r;
};

/**
 * Increment object property to the specified value
 * @param obj {Object}
 * @param prop {String}
 * @param byVal {Number}
 */
exports.propInc = function (obj, prop, byVal) {
	var val = byVal || 1;

	val = isNaN(val) ? 1 : Number(val);

	if (!isObj(obj)) {
		return obj;
	}

	if (obj[prop] === undefined) {
		obj[prop] = val;
	} else {

		if (isNaN(obj[prop])) {
			return obj;
		} else {
			obj[prop] = Number(obj[prop]);
		}

		obj[prop] += val;
	}

	return obj;
};

/**
 * Check is set object. If not, it creates it with the specified value
 * @param ob
 * @param def
 */
exports.beInObj = function (ob, prop, def) {
	if (def === undefined) def = {};

	if (ob && !ob[prop]) ob[prop] = def;

	return ob;
};

/**
 * Create path in object
 * @param obj
 * @param path
 */
exports.pathCreate = function(obj, path, def) {

	if (!isSet(path)) {
		path = obj;
		obj  = {};
	}

	if (typeof path === 'string') {
		path = path.split('.');
	}

	var b = obj;
	var len = path.length;

	if (len === 1) {
		exports.beInObj(b, path[0], def);
	} else if (len > 1) {

		len--;

		for (var i = 0; i < len; i++) {
			exports.beInObj(b, path[i]);
			b = b[path[i]];
		}


		exports.beInObj(b, path[len], def);
	}


	return obj;
};

/**
 * Check exist path in object
 * @param obj
 * @param path {Mixed}
 * @returns {Boolean}
 */
exports.isPathExist = function (obj, path) {
	var arPath = [];

	if (typeof path === 'string') {
		arPath = path.split('.');
	} else if (Array.isArray(path)) {
		arPath = path;
	}

	if (!arPath.length) return true;
	var p = arPath.shift();
	return obj.hasOwnProperty(p) || obj[p] === undefined ? exports.isSetByPath(obj[p], arPath) : false;
};

/**
 * Get element by path in object
 * @param obj
 * @param path
 * @returns {*}
 */
exports.pathVal = function(obj, path) {

	if (!isSet(obj) || !isObj(obj)) {
		return undefined;
	}

	var r = obj;

	if (typeof path === 'string') {
		path = path.split('.');
	}

	for (var i = 0, len = path.length; i<len; ++i) {
		var next = path[i];
		if (r[next]) {
			r = r[next];
		} else {
			return undefined;
		}
	}

	return r;
};

/**
 * Delete element by path in object
 * @param obj
 * @param path
 * @returns {*}
 */
exports.pathMv = function(obj, path) {

	if (exports.isString(path)) {
		path = path.split('.');
	}

	if (!exports.isSet(obj) || !exports.isObj(obj) || !exports.isSetByPath(obj, [].concat(path))) {
		return null;
	}

	path = path.map(function (el) {
		return '["' + el + '"]';
	});

	eval('delete obj' + path.join('') + ';');

	return true;
};

/**
 * Return new instance object v
 * @param v {Object}
 * @returns {string}
 */
module.exports.clone = function (v) {
	var r = {};

	if (isObj(v)) {
		exports.for(v, function (k, val) {
			r[k] =v;
		});
	}

	return v;
};

/**
 * Serialize object to url params
 * @param obj
 * @returns {string}
 */
exports.urlParams = function (obj) {
	var arr = [];

	exports.for(obj, function (key, val) {
		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
	});

	return arr.join('&');
};

/**
 * Properties in add object adding to obj or if properties not exits create him
 * @param obj
 * @param add
 * @returns {*}
 */
exports.ext = function (obj, add) {
	var j = function (obj, op) {
		exports.for(op, function (k, val) {
			if (isObj(val)) {
				if (!obj[k]) {
					obj[k] = val;
				} else {
					j(obj[k], val);
				}
			} else {
				obj[k] = val;
			}
		});
	};

	if (!obj) {
		obj = {};
	}

	if (add) {
		j(obj, add);
	}

	return obj;
};

/**
 * Check is object
 */
function isObj(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function isSet(v) {
	return typeof v !== 'undefined' && v !== null;
}

/**
 * Get property from array objects
 * @param arObj
 * @param prop
 * @returns {Array}
 */
exports.getPropToArr = function (arObj, prop) {
	var r = [];

	if (!Array.isArray(arObj)) {
		arObj = [arObj];
	}

	arObj.forEach(function (obj) {
		if (isSet(obj[prop])) {
			r.push(obj[prop]);
		}
	});

	return r;
};

/**
 * Collect object property to array
 * @param obj
 * @returns {Array}
 */
exports.propToArr = function (obj) {
	var arr = [];

	if (!isObj(obj)) {
		return arr;
	}

	exports.for(function (key) {
		arr.push(obj[key]);
	});

	return arr;
};

/**
 * ForEach for Object fn(key, val)
 * @param obj
 * @param fn
 */
exports.for = function (obj, fn) {
	if (isObj(obj)) {
		fn = typeof fn !== 'function' ? function(){} : fn;

		var keys = Object.keys(obj);

		for (var i = 0, len = keys.length; i<len; ++i) {
			var inx = keys[i];
			fn(inx, obj[inx]);
		}
	}
};

/**
 * if o is object return true else false
 * @param o
 * @returns {boolean}
 */
exports.isEmpty = function (obj) {
	if (!isObj(obj)) {
		return true;
	}

	var k = Object.keys(obj);

	return k.length ? false : true ;
};

/**
 * If the object property exists, its rounded
 * @param ob
 * @param round
 */
exports.beRound = function (ob, prop, round) {
	if (ob[prop]) ob[prop] = isNaN(ob[prop]) ? 0 :  Number(parseFloat(Number(ob[prop])).toFixed(round));
};
