/**
 * Created by igor on 05.10.16.
 * @description library for minification  javascript files
 * @module
 */
"use strict";

// Modules & utils

let fs = require('fs');
let dir = require('dir_cache');
let path = require('path');
let async = require('async');
let utils = require('utils-igor')(['type', 'obj', 'arr', 'str']);

// Code

/**
 * It is a frame for other classes
 */
class Frame {
	constructor (opt, cb) {
		let that = this;
		this.active = 'constructor';

		that._isStop = null;
		cb = utils.type.beFn(cb);
		that.validOptions(opt, (e) => {
			cb(e, that);
		});
	};
	_mess (mess) {
		let that = this;
		let c = that.constructor.name;
		let a = that.active;
		return {
			active : a,
			mess : `Class ${c}/${a}: ${mess}`,
			class : c
		};
	};

	/**
	 * Return error object and set flag for stop process
	 * @method
	 * @param mess
	 * @param data
	 * @returns {{message: *, method: a, class: c, type: string}}
	 */
	err (mess, data) {
		var param = this._mess(mess);

		this.stop = param.mess;

		return {
			message : param.mess,
			method : param.active,
			class : param.class,
			type : 'ERROR',
			data : data || ''
		};

	};

	/**
	 * Get text for message
	 * @method
	 * @param {String} mess
	 * @param {Class} that
	 */
	warn (mess, that) {
		that = that || this;
		console.log('WARN: ' + that._mess(mess).mess);
	};
}

/**
 * Minification one javascript file
 */
class MinifyFile extends Frame {

	/**
	 * Start process
	 * @param {Function}cb
	 */
	run (cb) {
		let that = this;
		that.active = 'Run';
		cb = utils.type.beFn(cb);

		if (this._isStop) {
			return cb(that.err(that._isStop));
		}

		that.fileRead(cb);
	};

	/**
	 * Get file contents
	 * @param {Function}cb
	 */
	fileRead (cb) {

		let that = this;
		that.active = 'fileRead';

		fs.readFile(that.filePath, (e, data) => {

			if (e) {
				that._isStop = 'No read file';
				return cb(that.err(that._isStop, e));
			}

			that.data  = data.toString();
			that.compess().save(cb);
		});
	};

	/**
	 * Save result
	 * @param {Function}cb
	 */
	save (cb) {
		let that = this;
		that.active = 'save';
		fs.writeFile(that.dist, that.data, cb);
	};
	/**
	 * Compress file contents
	 * @param {Function}cb
	 */
	compess()  {
		let that = this;
		that.active = 'compess';
		let d = that.data;
		let qoutesSave = {};
		let i = 0;
		['"', '`', `'`].forEach((q) => {
			let search =  d.match(new RegExp(q +'(.*)' + q, 'g'));

			if (search)
				for (var k = 0; k < search.length; k++) {
					qoutesSave[i] = search[k];

					if (~search[k].indexOf('$'))
						continue;

					d = d.replace(search[k], `#${i}#`);
					i++;
				}
		});

		// Remove comments, tabuliar symbols, Only one space
		d = d.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
			.replace(/(\r|\n|\t)/g, '')
			.replace(/(\s+)/g, ' ');

		// Back qoutes
		utils.obj.each(qoutesSave, (inx, val) => {
			let r;
			if (inx == 7) {
				r = new RegExp(`#${inx}#`,'g');
			}

			d = d.replace(new RegExp(`#${inx}#`,'g'), val)
		});

		that.data = d;
		return that;
	};

	/**
	 * Check options
	 * @param {Object}opt
	 * @param {Function}cb
	 * @returns {*}
	 */
	validOptions (opt, cb) {

		let that = this;
		that.active = 'validOptions';

		if (!opt.file || !opt.dist || !opt.dist.length) {
			that._isStop = 'No js file or dist in options';
			return cb(that.err(that._isStop));
		}

		that.filePath = path.resolve(opt.file);

		fs.exists(that.filePath, (exists) => {

			if (!exists) {
				that._isStop = `No exists file ${opt.file}`;
				return cb(that.err(that._isStop));
			}

			that.file = opt.file;
			that.dist = opt.dist;

			cb(null);

		});

	};
}
/**
 * Minification not one javascript file
 */
class MinifyFiles extends Frame {
	/**
	 * Check options
	 * @param {Array}opt
	 * @param {Function}cb
	 * @returns {*}
	 */
	validOptions (opt, cb) {

		let that = this;
		that.active = 'validOptions';
		that.opt = [];

		if (!Array.isArray(opt)) {
			that._isStop = 'Options is no array';
			return cb(that.err(that._isStop));
		}

		async.map(opt, (o, end) => {
			new MinifyFile(o, (e, compress) => {

				if (e) {
					return end(e);
				}

				o.compess = compress;
				that.opt.push(o);
				end();
			})

		}, (e) => cb(e, that));
	};
	/**
	 * Start process
	 * @param {Function}cb
	 */
	run(cb) {
		let that = this;
		that.active = 'Run';
		cb = utils.type.beFn(cb);

		if (this._isStop) {
			return cb(that.err(that._isStop));
		}

		async.eachSeries(that.opt, (file, next) => file.compess.run(next), cb);
	};
}
/**
 * Minification all javascript file in folder
 */
class MinifyFilesDir extends Frame {
	/**
	 * Check options
	 Format options {dir : 'source folder', targer : 'destination folder' , add : 'add to name' }
	 * @param {Object}opt
	 * @param {Function}cb
	 * @returns {*}
	 */
	validOptions (opt, cb) {

		let that = this;
		that.active = 'validOptions';
		that.opt = [];

		if (!opt.dir || !opt.dir.length) {
			that._isStop = 'No options dir';
			return cb(that.err(this._isStop));
		} else {
			opt.dir = path.resolve(opt.dir);
		}

		if (!opt.target || !opt.target.length) {
			that._isStop = 'No options target';
			return cb(that.err(this._isStop));
		} else {
			opt.target = path.resolve(opt.target);
		}

		if (!opt.add) {
			opt.add = '';
		}

		that.opt = opt;

		fs.exists(opt.dir, (exist) => {

			if (exist) {
				return cb();
			}

			that._isStop = 'No exists sourse folder';

			cb(that.err(that._isStop));

		});

	};

	/**
	 * Start process
	 * @param {function} cb
	 */
	run (cb) {
		let that =this;
		that.active = 'Run';
		cb = utils.type.beFn(cb);

		dir.scan({
			dirs : that.opt.dir,
			exts : '.js'
		}, (e, scan) => {

			if (e) {
				return cb(e);
			}

			scan.run((e) => {

				if (e) {
					return cb(e);
				}

				let ut = require('util');
				console.log('res ', ut.inspect(scan, false,  null));

				let files = [];
				let pathCheck = [];

				if (!scan.res.length || !scan.res[0].files.length) {
					return cb();
				}

				for (let i = 0; i< scan.res[0].files.length; ++i) {
					let file = scan.res[0].files[i];
					let fileFullName = path.basename(file);
					let fileName = path.basename(file, '.js');
					let dist = that.opt.target + '/' + file.replace(fileFullName, fileName + that.opt.add + '.js');
					file = that.opt.dir + '/' + file;

					files.push({
						file : file,
						dist : dist
					});

					pathCheck.push(path.dirname(dist));

				}

				async.map(pathCheck, (p, endChek) => fs.exists(p, (exists) => exists ? endChek() : fs.mkdir(p, endChek)), (e) => {

					if (e) {
						return cb(e);
					}

					async.map(files, (opt, end) => new MinifyFile(opt, (e, compres) => compres.run(end)), cb);
				});
			});

		});

	};
}
exports.dir = (opt, cb) => new MinifyFilesDir(opt, cb);
exports.file = (opt, cb) => new MinifyFile(opt, cb);
exports.files =(opt, cb) => new MinifyFiles(opt, cb);
