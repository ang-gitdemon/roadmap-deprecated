/**
 * Created by igor on 05.10.16.
 */
module.exports = require(`./lib/${process.env.NODE_ENV !== 'dev' ? 'prod/' : ''}minify-js`);
