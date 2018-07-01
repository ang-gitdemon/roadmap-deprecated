/**
 * Created by igor on 06.10.16.
 */
"use strict";

let utils = require('./index.js')();

describe('array', () => {
	let test = ['test'],
	    testNumber = [1, 4, 2, 3],
	    testNumber1 = [1, 2],
	    testWithDouble = [1, 1, 2, 2],
	    res;

	it('check', done => {

		if (utils.arr.check(test) != test) {
			throw 'arr.check return different array';
		}

		if (utils.arr.check(null) == []) {
			throw 'arr.check return no empty array';
		}

		done();
	});

	it('sortNumber', done => {

		res = testNumber.sort(utils.arr.sortNumber);

		let bad = false;
		for (let i = 0; i < res.length; i++) if (res[i] !== i + 1) bad = true;

		if (bad) {
			throw 'arr.sortNumber bad sort';
		}

		done();
	});

	it('share', done => {

		res = utils.arr.share(testNumber, testNumber1);

		if (res[0] != 1 || res[1] != 2) {
			throw 'arr.share bad';
		}

		done();
	});

	it('diff', done => {

		res = utils.arr.diff(testNumber, testNumber1);

		if (res[0] != 3 || res[1] != 4) {
			throw 'arr.diff bad';
		}

		done();
	});

	it('unique', done => {

		res = utils.arr.unique(testWithDouble);

		if (res[0] != 1 || res[1] != 2) {
			throw 'arr.unique bad';
		}

		done();
	});

	it('mvVal', done => {

		res = utils.arr.mvVal(testWithDouble, 2);

		if (res[0] != 1 || res[1] != 1) {
			throw 'arr.mvVal bad';
		}

		done();
	});

	it('sum', done => {

		res = utils.arr.sum(testNumber);

		if (res != 10) {
			throw 'arr.sum bad';
		}

		done();
	});

	it('avg', done => {

		res = utils.arr.avg(testNumber.concat([0]));

		if (res != 2) {
			throw 'arr.avg bad';
		}

		done();
	});

	it('urls', done => {

		res = utils.arr.urls(['', 'test.com', 'http://test2.com']);

		if (res[0] != 'http://test.com' || res[1] != 'http://test2.com') {
			throw 'arr.urls bad';
		}

		done();
	});
});
describe('type', () => {

	it('isString', done => {

		if (!utils.type.isString('sfgf')) throw 'String != String';

		if (utils.type.isString(123)) throw 'No string = String';

		done();
	});

	it('isSet', done => {
		let o = { test: 1, test2: null };

		if (!utils.type.isSet(o.test)) throw 'Set no set';

		if (utils.type.isSet(o.test2)) throw 'NULL is Set';

		if (utils.type.isSet(o.test3)) throw 'Undefined is Set';

		done();
	});

	it('isFn', done => {

		if (utils.type.isFn(null)) throw 'Null is function';

		if (!utils.type.isFn(utils.type.noop)) throw 'function is no function';

		done();
	});

	it('isObj', done => {
		if (utils.type.isObj(null)) throw 'Null is object';

		if (!utils.type.isObj({})) throw 'object is no object';

		done();
	});

	it('beFn', done => {
		if (utils.type.beFn(null) != utils.type.noop) throw 'No covert';

		done();
	});

	it('cloneVar', done => {
		let z = { v: 1 };
		let m = o => utils.type.cloneVar(o).v = 3;

		m(z);

		if (z.v !== 1) {
			throw 'Be change value';
		}

		done();
	});
});
describe('object', () => {

	it('beRound', done => {
		let o = { 'round': 2.568, prop: 'AAA' };

		utils.obj.beRound(o, 'round', 1);
		utils.obj.beRound(o, 'test', 1);
		utils.obj.beRound(o, 'prop', 1);

		if (o.round !== 2.6) throw 'No correct round';

		if (utils.type.isSet(o.test)) throw 'No correct stability tests 1';

		if (o.prop !== 0) throw 'No correct stability tests 2';

		done();
	});

	it('isEmpty', done => {
		let e = {};
		let ne = { e: 3 };

		if (!utils.obj.isEmpty(e)) {
			throw 'Empty object no enmpty';
		}

		if (utils.obj.isEmpty(ne)) {
			throw 'No empty object is enmpty';
		}

		done();
	});

	it('each', done => {
		let o = { p1: 1, p2: 2 };

		utils.obj.each(o, (k, v) => o[k] = ++v);

		if (o.p1 !== 2 || o.p2 !== 3) {
			throw 'No correct inc';
		}

		done();
	});

	it('propToArr', done => {
		let r = utils.obj.propToArr({ p1: 1, p2: 2 });

		if (r[0] !== 1 || r[1] !== 2) {
			throw 'No collect';
		}

		done();
	});

	it('getPropToArr', done => {
		let r = utils.obj.getPropToArr([{ p: 1 }, { p: 2 }, { z: 3 }], 'p');

		if (r[0] !== 1 || r[1] !== 2) {
			throw 'No collect';
		}

		done();
	});

	it('ext', done => {
		let r = utils.obj.ext({}, { p: 1 });

		if (r.p !== 1) {
			throw 'No extented';
		}

		done();
	});

	it('urlParams', done => {

		if (utils.obj.urlParams({ p: 1, p2: 2 }) !== 'p=1&p2=2') {
			throw 'No create query string';
		}

		done();
	});

	it('pathMv', done => {
		let o = { p: { p: 1 } };

		utils.obj.pathMv(o, 'p.p');

		if (!utils.obj.isEmpty(o.p)) {
			throw 'No delet path';
		}

		done();
	});

	it('pathVal', done => {
		let o = { p: { p: 1 } };
		let r = utils.obj.pathVal(o, 'p.p');

		if (r !== 1) {
			throw 'No correct get';
		}

		r = utils.obj.pathVal(o, 'p.z');

		if (r) {
			throw 'Get undefined';
		}

		done();
	});

	it('isPathExist', done => {
		let o = { p: { p: 1 } };
		let r = utils.obj.isPathExist(o, 'p.p');

		if (!r) {
			throw 'No exists path';
		}

		r = utils.obj.pathVal(o, 'p.z');

		if (r) {
			throw 'No exists path is exists';
		}

		done();
	});

	it('pathCreate', done => {
		let o = {};
		let r = utils.obj.pathCreate(o, 'p.p', 1);

		if (o.p.p !== 1) {
			throw 'No exists path';
		}

		done();
	});

	it('beInObj', done => {
		let o = { z: 2 };
		utils.obj.beInObj(o, 'p', 1);
		utils.obj.beInObj(o, 'z', 1);

		if (o.p !== 1) {
			throw 'No create';
		}

		if (o.z !== 2) {
			throw 'Change object';
		}

		done();
	});

	it('propInc', done => {
		let o = { z: 2 };
		utils.obj.propInc(o, 'p', 1);
		utils.obj.propInc(o, 'z');

		if (o.p !== 1) {
			throw 'No create';
		}

		if (o.z !== 3) {
			throw 'No inc';
		}

		done();
	});

	it('keysChange', done => {
		let o = { z: 2 };
		o = utils.obj.keysChange(o, { z: 'b' });

		if (!o.b) {
			throw 'No change';
		}

		if (o.z) {
			throw 'No remove old';
		}

		done();
	});

	it('arrToObjByKey', done => {
		let o = [{ z: 2 }, { z: 3 }];
		let r = utils.obj.arrToObjByKey(o, 'z');

		if (r['2'].z != 2 || r['3'].z != 3) {
			throw 'Bab get';
		}

		done();
	});
});

describe('date', () => {
	let ts = 1475825015612;

	it('date', done => {

		if (utils.date.date(null, ts) !== '2016-10-07') {
			throw 'Bab work ' + utils.date.date(null, ts);
		}

		done();
	});

	it('time', done => {

		if (utils.date.time(ts) !== '10:23:35') {
			throw 'Bab work ' + utils.date.time(ts);
		}

		done();
	});

	it('tsToMin', done => {

		if (utils.date.tsToMin(ts) !== 24597083) {
			throw 'Bab work down ' + utils.date.tsToMin(ts);
		}

		if (utils.date.tsToMin(ts, true) !== 24597084) {
			throw 'Bab work up ' + utils.date.tsToMin(ts, true);
		}

		done();
	});

	it('tsToSec', done => {

		if (utils.date.tsToSec(ts) !== 1475825015) {
			throw 'Bab work down ' + utils.date.tsToSec(ts);
		}

		if (utils.date.tsToSec(ts, true) !== 1475825016) {
			throw 'Bab work up ' + utils.date.tsToSec(ts, true);
		}

		done();
	});

	it('minToTs', done => {

		if (utils.date.minToTs(1475825015) !== 88549500900000) {
			throw 'Bab work  ' + utils.date.minToTs(1475825015);
		}

		done();
	});

	it('secToTs', done => {

		if (utils.date.secToTs(1475825015) !== 1475825015000) {
			throw 'Bab work  ' + utils.date.secToTs(1475825015);
		}

		done();
	});
});

describe('string', () => {
	let word = 'welcome';
	let base64 = 'd2VsY29tZQ==';

	it('base64', done => {

		if (utils.str.base64(word) !== base64) {
			throw 'Bab encode ' + utils.str.base64(word);
		}

		if (utils.str.base64(base64, true) !== word) {
			throw 'Bab decode ' + utils.str.base64(word);
		}

		done();
	});

	it('salt', done => {
		let salt = utils.str.salt();

		if (!utils.type.isString(salt) || !salt.length) {
			throw 'Bad work ' + salt;
		}

		done();
	});

	it('hash', done => {
		if (utils.str.hash(word) !== 'bf067ea3238bc612fd47ee9b246cedc47be3956fa99c23c403dbc3af3108cc2bc1d52fa592bf82b9b40630bdabc27b1b3ab73274dc086318aba1a030650af19e') {
			throw 'bad work ' + utils.str.hash(word);
		}

		done();
	});

	it('up1stChar', done => {
		if (utils.str.up1stChar(word) !== 'Welcome') {
			throw 'bad work ' + utils.str.up1stChar(word);
		}

		done();
	});

	it('fullReplace', done => {

		if (utils.str.fullReplace('Cucu', 'u', 'i') !== 'Cici') {
			throw 'bad work ' + utils.str.fullReplace('Cucu', 'u', 'i');
		}

		done();
	});

	it('regexpEscape', done => {
		if (utils.str.regexpEscape('{Cucu}') !== '\\{Cucu\\}') {
			throw 'bad work ' + utils.str.regexpEscape('{Cucu}');
		}

		done();
	});

	it('htmlEscape', done => {
		if (utils.str.htmlEscape('<h1>') !== '&lt;h1&gt;') {
			throw 'bad work ' + utils.str.htmlEscape('<h1>');
		}

		done();
	});

	it('removeSpecSymbols', done => {
		if (utils.str.removeSpecSymbols('h$&1') !== 'h 1') {
			throw 'bad work ' + utils.str.removeSpecSymbols('h  1');
		}

		done();
	});

	it('oneSpace', done => {
		if (utils.str.oneSpace('h  1') !== 'h 1') {
			throw 'bad work ' + utils.str.oneSpace('h  1');
		}

		done();
	});

	it('makeKey', done => {
		let k = utils.str.makeKey();
		if (!utils.type.isSet(k)) {
			throw 'bad work ' + k;
		}

		done();
	});

	it('decodeURIUniversal', done => {
		let ur = '%D0%9F%D0%A0%D0%98%D0%92%D0%95%D0%A2';

		if (utils.str.decodeURIUniversal(ur) !== 'ПРИВЕТ') {
			throw 'BAD ' + utils.str.decodeURIUniversal(ur);
		}

		done();
	});

	it('boolString', done => {
		if (utils.str.boolString('true') !== true) {
			throw 'Bad result true';
		}

		if (utils.str.boolString('normal') !== false) {
			throw 'Bad result false';
		}

		done();
	});
});

//# sourceMappingURL=test-compiled.js.map