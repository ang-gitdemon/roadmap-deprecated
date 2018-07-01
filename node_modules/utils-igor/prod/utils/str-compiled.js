"use strict";
const base = 'base64';exports.base64 = (str, decode) => !(decode || false) ? new Buffer(str).toString(base) : new Buffer(str, base).toString('utf8');exports.salt = len => Math.random().toString(36).substring(2, (len || 5) + 2);exports.hash = (str, salt, method, secret) => {
  let sha = require('crypto').createHmac(method || 'sha512', secret || 'IgorStcherbina').update(String(str), 'utf8');return (salt ? sha.update(salt) : sha).digest('hex');
};exports.up1stChar = s => s.substring(0, 1).toUpperCase() + s.substring(1);exports.regexpEscape = text => text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');exports.fullReplace = (str, find, replace) => str.replace(new RegExp(exports.regexpEscape(find), 'g'), replace);exports.htmlEscape = (str, maxLength) => {
  if (str && str.length) {
    str = exports.fullReplace(exports.fullReplace(str, '<', '&lt;'), '>', '&gt;');if (maxLength) str = str.substr(0, maxLength);
  }return str;
};exports.oneSpace = str => str.replace(/\s\s+/g, ' ').trim();exports.removeSpecSymbols = str => exports.oneSpace(str.replace(/[&\/\\#,+()$~%.`'":*?!<>{}\[\]]/g, ' '));exports.makeKey = (n, accept) => {
  n = n || 30;accept = accept || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';let t = '';for (let i = 0; i < n; i++) t += accept.charAt(Math.floor(Math.random() * accept.length));return t;
};exports.decodeURIUniversal = str => {
  try {
    str = decodeURIComponent(str);
  } catch (err) {
    try {
      str = decodeURI(str);
    } catch (err) {
      str = str || '';
    }
  }return str;
};exports.boolString = vl => vl === 'true';

//# sourceMappingURL=str-compiled.js.map