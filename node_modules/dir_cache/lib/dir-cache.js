/**
 * Created by Stcherbina Igor on 03.10.16.
 * @module cacheDir
 * @description This module is needed for caching data.
 * It can search for files with certain extension in folders.
 * Collect file contents or contents could be through a flaw require function.
 * Also caches template files swigJs.
 */

"use strict";
/* globals async, utils, path, fs, require */
// Modules && utils

let async = require('async');
let utils = require('utils-igor')(['obj', 'type', 'arr']);
let path = require('path');
let fs = require('fs');

// Vars

var isDebug = process.env.NODE_DEBUG === 'dev';
var isDebugColor = process.env.NODE_DEBUG_COLOR ? true : false;
let log = {
	err : (m) => utils.type.noop,
	info : (m) => utils.type.noop,
	error : (m) => utils.type.noop,
	warn :   (m) => console.log('WARN : ' + m)
};

// Code

if (isDebug) {

	log = {
		err : (m) => console.log('ERR : ' + m),
		info : (m) => console.log('INFO : ' + m),
		error : (m) => console.log('ERR : ' + m),
		warn :  (m) => console.log('WARN : ' + m)
	};

	if (isDebugColor) {
		var winston = require('winston');

		log = new winston.Logger({
			transports: [
				new winston.transports.Console({
					level: 'debug',
					handleExceptions: true,
					json: false,
					colorize: true
				})
			],
			exitOnError: false
		});

		log.err = log.error;
	}

}

/**
 * It is a frame for other classes
 */
class Frame {
	constructor () {
		this.active = 'constructor';
	};
	/**
	 * @method Collected data for message
	 * @param {String} mess
	 * @returns {{mess: *, active: string, class: *}}
	 * @private
	 */
	_mess (mess) {
		let that = this;
		let c = that.constructor.name;
		let a = that.active;
		return {
			mess : `Class ${this.active}/${a}: ${mess}`,
			active : a,
			class : c
		};
	};

	/**
	 * Return error object and set flag for stop process
	 * @method
	 * @param mess
	 * @returns {{message: *, method: a, class: c, type: string}}
	 */
	err (mess) {
		var param = this._mess(mess);

		this.stop = param.mess;

		return {
			message : param.mess,
			method : param.active,
			class : param.class,
			type : 'ERROR'
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
		log.warn(that._mess(mess).mess);
	};
}
/**
 * Search files in folders
 */
class Scan extends  Frame {
	/**
	 * Set option to class and run callback
	 * @param {object} options
	 * @param {function} cb
	 * @returns {*}
	 */
	constructor (options, cb) {

		super();

		let that = this;
		that.stop = null;
		that.res = [];

		that.valid(options);

		// callback

		cb = utils.type.beFn(cb);

		if (!that.dirs.length) {
			return cb(that.err('Dirs is empty'));
		}

		log.info(`Be async call for check exists folders [${that.dirs}]`);

		async.map(that.dirs, (dir, endDir) => {

			log.info(`Process ${dir}`);

			utils.type.isObj(dir)
				? dir = dir.path
				: dir = path.resolve(dir);

			log.info(`Check exist ${dir}`);

			fs.exists(dir, (exist) => endDir(exist ? null : that.err(`${dir} no exists`)));

		}, (e) => {
			cb(e, that);
		});
	};

	/**
	 * Validates options
	 * @param {Object} options
	 */
	valid (options) {

		let that = this;
		// check options

		options = that.beforeValid(options);

		options = options || {};
		options.dirs = options.dirs || [];
		options.exts = options.exts || [];

		utils.obj.for(options, (k, v) => {

			if ( ~['exts', 'dirs'].indexOf(k)) {
				v = utils.arr.unique(Array.isArray(v) ? v : [v]);
			}
			if (that.iterValid(options, k, v)) {
				that[k] = v;
			}

		}) ;

	};

	/**
	 * Hook before validates options
	 * @param {Object} options
	 * @returns {Object}
	 */
	beforeValid (options) {
		return options;
	};

	/**
	 * Hook for iter validates options
	 * @param {Object} options
	 * @param {String}k
	 * @param {String}v
	 * @returns {boolean}
	 */
	iterValid (options, k, v) {
		return true;
	};

	/**
	 * Join file path
	 * @param main
	 * @param attach
	 * @returns {string}
	 * @private
	 */
	_filePath (main, attach)   {
		return attach ? attach + '/' + main : main;
	};

	/**
	 * Check extension file
	 * @param {String} file
	 * @returns {boolean}
	 */
	isCorrectExt (file) {
		return this.exts.length ? (new RegExp('(' + this.exts.join('|').replace(/\./g, '\\.') + ')$')).test(file) : false;
	};

	/**
	 * Check use all extension
	 * @returns {boolean}
	 */
	isAll () {
		return this.exts.length === 0
	};

	/**
	 * Collected files path in folder
	 * @param {String}dir
	 * @param {Function} endDir
	 * @param {String} add
	 * @param {Object} res
	 * @private
	 */
	_dirFiles  (dir, endDir, add, res) {

		var that = this;

		that.active = '_dirFiles';

		dir = utils.type.isObj(dir) ? dir.path : dir;

		if (!add) {
			res = {
				files : [],
				dir : dir
			};
			that.res.push(res);
		}


		log.info(`Scan dir ${dir}`);

		fs.readdir(dir, (e, arFile) => {

			if (e) {
				return endDir(e);
			}

			let folder = [];

			arFile.filter((file)  => {

				if (that.isCorrectExt(file))
					return true;

				// check no folder folder

				try {
					let check = dir + '/' + file;
					let stats = fs.lstatSync(check);

					if (stats.isDirectory()) {
						folder.push(file);
						return false;
					}

				} catch (e) {
					that.warn(`Bad stats for ${check} ${e}` );
					return false;
				}

				return that.isAll();

			} ).map((file) => {
					res.files.push(that._filePath(path.basename(dir + '/' + file), add));

			});

			if (!folder.length) {
				return endDir();
			}

			async.map(folder, (folder, endFolder) => that._dirFiles(dir + '/' + folder, endFolder, that._filePath(folder, add), res), endDir);

		});

	};

	/**
	 * Start search process
	 * @param {Function}cb
	 * @returns {*}
	 */
	run (cb) {
		var that =this;
		that.active = 'run';
		cb = utils.type.beFn(cb);

		if (that.stop) {
			return cb(that.err(that.stop));
		}

		log.info('Run scan dirs');

		async.map(that.dirs, (dir, end) => that._dirFiles(dir, end), (e) => {
			cb(e, this);
		});
	};

}
/**
 * Get text swig template files and jon partial
 */
class Swig extends Scan {
	/**
	 * Start collected process
	 * @param {Function} cb
	 */
	run (cb) {
		var that=this;

		super.run((e, scan) => {

			if (e) {
				return cb(e);
			}

			async.map(scan.res, (data, endData) => {

				if (data.files.length) {
					return async.map(data.files, (file, endFile) => {
						that.fileGet(data.dir, file, endFile);
					}, endData);
				}
				endData();
			}, (e) => cb(e, that));
		})
	};

	/**
	 * Get text files
	 * @param {String}dir
	 * @param {String}file
	 * @param {Function}endFile
	 */
	fileGet (dir, file, endFile) {
		let that = this;
		let p = path.resolve(dir + '/' + file);
		fs.readFile(p, (e, data) => {

			if (e) {
				that.warn('No read file ' + p);
				console.log(e);
				return endFile();
			}

			log.info('Read file' + p);

			that.fileToRes(p, dir, file, data, () => endFile());
		});
	};

	/**
	 * Write text to result
	 * @param {String}pathFile
	 * @param {String}dir
	 * @param {String}file
	 * @param {String}data
	 * @param {function} cb
	 */
	fileToRes (pathFile, dir, file, data, cb) {
		let that = this;
		that.active = 'fileToRes';
		that.dataToRes(pathFile, dir, file, data, (e, data) => {

			if (e) {
				that.warn(`error not process data in file ${pathFile}`);
				console.log(e);
				return cb();
			}

			utils.obj.beInObj(that.res, 'cache');
			file = file.replace(path.extname(file), '');
			that.res.cache[file] = data;

			cb();
		});
	};

	/**
	 * Write data to result
	 * @param {String}pathFile
	 * @param {String}dir
	 * @param {Stringfile
	 * @param {Stringdata
	 * @param {Function}cb
	 * @returns {*}
	 */
	dataToRes (pathFile, dir, file, data, cb) {
		data = data.toString();

		let that = this;
		let incs = data.match(/\{\%(.*)include(.*)\'(.*)\'(.*)\%\}/g);
		let pathFileGet = () => pathFile;
		that.active = 'fileToRes';

		if (incs) {

			return async.map(incs, (inc, nextInc) => {

				let incPath = inc.match(/\'(.*)\'/);

				if (!incPath) {
					that.warn(`No find include path in ${inc}`, that);
					return nextInc();
				}

				incPath = incPath.length > 1 ? incPath[1] : '';

				let incPathFile = pathFile.replace(path.basename(file), '') + incPath;

				incPathFile = incPathFile.toString();

				fs.readFile(incPathFile , (e, incData) => {

					if (e) {
						that.warn(`No get file for include ${incPathFile}`, that);
						return nextInc();
					}

					data = data.replace(inc, incData.toString());
					nextInc();
				});

			}, (e) => cb(e, that.oneLineBreak(data)));
		}

		cb(null, that.oneLineBreak(data));
	};

	/**
	 * Clears data from the extra line breaks
	 * @param {String}data
	 * @returns {string|XML|*|void}
	 */
	oneLineBreak (data) {
		return data.replace(/(\n+)/g, "\n");
	};
}
/**
 * Get text any files
 */
class Reader extends  Swig {
	/**
	 * Write text to result
	 * @param {String}pathFile
	 * @param {String}dir
	 * @param {String}file
	 * @param {String}data
	 * @param {Function}endFile
	 */
	fileToRes (pathFile, dir, file, data, endFile) {
		let that = this;
		let ext = path.extname(file);
		file = file.replace(ext, '');
		ext = ext.replace('.', '');

		that.res = utils.obj.pathCreate(that.res, ['cache', ext, dir]);
		that.res.cache[ext][dir][file] =data;

		endFile();
	};
}
/**
 * Get files via function require
 */
class Reuired extends Swig {
	/**
	 * Overwrite before valid
	 * @param {String}options
	 * @returns {Object}
	 */
	beforeValid (options) {
		options.exts = options.exts && options.exts.length ? options.exts : ['.json', '.js'] ;
		options.isCall = utils.type.isSet(options.isCall) ? options.isCall : true;
		return options;
	};

	/**
	 * Overwrite fileGet
	 * @param {String} dir
	 * @param {String}file
	 * @param {Function}endFile
	 * @returns {*}
	 */
	fileGet (dir, file, endFile) {
		let that = this;
		let p = path.resolve(dir + '/' + file);

		log.info(`Require file ${p}`);

		try {
			let data = require(p);

			if (utils.type.isFn(data) && that.isCall) {
				data = data();
			}

			if (that.call && utils.type.isFn(data[that.call])) {
				data[that.call]();
			}

			let ext = path.extname(file);
			file = file.replace(ext, '');

			if (that.exts.length > 1) {
				ext = ext.replace('.', '');
				that.res = utils.obj.pathCreate(that.res, ['cache', ext,  file], data);
			} else {
				that.res = utils.obj.pathCreate(that.res, ['cache', file], data);
			}

			endFile();

		} catch (e) {
			that.warn(`No require file ${p}`, that);
			console.log(e);
			return endFile();
		}

	};
}
/**
 * Create object for saving data
 */
class Cache {
	constructor () {
		this._data = {};
		return this;
	};
	set data (data) {
		this._data = data;
	};
	get data () {
		return this._data;
	};

}
/**
 * Exports classes
 * @type {{scan: Function, swig: Function, read: Function, cache: Function, required: Function}}
 */
module.exports = {
	scan : (options, cb) => new Scan (options, cb),
	swig : (options, cb) => new Swig (options, cb),
	read : (options, cb) => new Reader (options, cb),
	cache : () => new Cache(),
	required : (options, cb) => new Reuired (options, cb)
};
