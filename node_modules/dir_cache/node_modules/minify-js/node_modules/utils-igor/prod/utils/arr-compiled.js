"use strict";
exports.check = arr => Array.isArray(arr) ? arr : [];var check = exports.check;exports.sortNumber = (a, b) => parseFloat(a) - parseFloat(b);exports.share = (arr1, arr2) => check(arr1).filter(val => check(arr2).indexOf(val) !== -1);exports.diff = (arr1, arr2) => Array.isArray(arr2) ? check(arr1).filter(i => arr2.indexOf(i) === -1) : [];exports.unique = arr => check(arr).filter((value, index, self) => self.indexOf(value) === index);exports.mvVal = (arr, value) => check(arr).filter(v => v !== value);exports.sum = a => Array.isArray(a) ? a.reduce((pv, cv) => (isNaN(pv) ? 0 : Number(pv)) + (isNaN(cv) ? 0 : Number(cv)), 0) : 0;exports.avg = a => !Array.isArray(a) || !a.length ? 0 : exports.sum(a) / a.length;exports.urls = arr => {
  let r = [];arr = arr || [];arr = Array.isArray(arr) ? arr : [arr];for (let i = 0; i < arr.length; ++i) {
    let el = arr[i] || '';el = el.trim().toLowerCase();if (el.indexOf('://') === -1) el = 'http://' + el;if (/^htt(p|ps)\:\/\/(.*)+\.(.*)+$/.test(el)) r.push(el);
  }return r;
};

//# sourceMappingURL=arr-compiled.js.map