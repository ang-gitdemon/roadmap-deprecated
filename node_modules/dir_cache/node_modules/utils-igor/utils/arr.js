/**
 * Created by igor on 30.05.16.
 */

/**
 * By default the sort method sorts elements alphabetically.
 * To sort numerically just add a new method which handles numeric sorts
 * e.g. [11, 1, 2].sort(utils.sortNumber);
 * @param a
 * @param b
 * @returns {number}
 */
exports.sortNumber = function (a, b) {
	return parseFloat(a) - parseFloat(b);
};


/**
 *  Return share part of the array
 * @param arr1
 * @param arr2
 * @returns {Array}
 */
module.exports.share = function (arr1, arr2) {
	var r = [];

	if (!Array.isArray(arr1)) {
		arr1 = [];
	}

	if (!Array.isArray(arr2)) {
		arr2 = [];
	}

	r = arr1.filter(function (val) {
		return arr2.indexOf(val) !== -1;
	});

	return r;
};

/**
 * Return different part of the array
 * @param	{Array} arr1
 * @param	{Array} arr2
 * @return {Array}
 */
exports.diff = function (arr1, arr2) {
	if (Array.isArray(arr1)) {
		return arr1.filter(function (i) {
			return arr2.indexOf(i) === -1;
		});
	} else {
		return [];
	}
};

/**
 * Clear repeat values
 * @param {Array} arr
 */
exports.unique = function (arr) {
	return arr.filter(function (value, index, self) {
		return self.indexOf(value) === index;
	});
};

/**
 * Delete all elements whith specified value
 * @param {Array} arr массив для очистки
 * @param {Mixed} value значение
 * @constructor
 */
exports.mvVal = function (arr, value) {

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === value) {
			arr.splice(i, 1);
			--i;
		}
	}

	return arr;
};

/**
 * Sum of array elements
 * @return {Number}
 */
exports.sum = function (a) {
	var r = 0;

	if (Array.isArray(a)) {
		r = a.reduce(function (pv, cv){
			return (isNaN(pv) ? 0 : Number(pv))+(isNaN(cv) ? 0 : Number(cv))
		}, 0);
	}

	return r;
};

/**
 * Return average elements array
 * @param a
 * @returns {number}
 */
exports.avg = function (a) {
	var r = 0

	if (!Array.isArray(a) || !a.length ) {
		return r;
	}

	return exports.sum(a) / a.length;
}

/**
 * Return array. When element is url collect from specified array
 * @param arr
 * @returns {Array}
 */
exports.urls = function (arr) {
	var r = [];
	arr = arr || [];
	arr = Array.isArray(arr) ? arr : [arr];

	for (var i = 0, len = arr.length; i<len; ++i) {
		var el = arr[i];
		if (!el) {
			return;
		}

		el = el.trim().toLowerCase();

		if (el.indexOf('://') === -1) {
			el = 'http://' + el;
		}

		if (/^htt(p|ps)\:\/\/(.*)+\.(.*)+$/.test(el)) {
			r.push(el);
		}
	}

	return r;
};

