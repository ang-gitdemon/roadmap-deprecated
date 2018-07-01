"use strict";
let unix = ts => ts || Date.now();exports.time = ts => /(\d{2}:\d{2}:\d{2})/.exec(new Date(unix(ts)).toTimeString())[1];exports.date = (shiftDays, ts, format) => {
  let now = new Date(unix(ts));if (shiftDays) {
    now.setDate(now.getDate() + Number(shiftDays));
  }let y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();return (format || 'y-m-d').replace('y', y).replace('m', m >= 10 ? m : '0' + m).replace('d', d >= 10 ? d : '0' + d);
};exports.dateTime = (shiftDays, ts, format) => exports.date(shiftDays, ts, format) + ' ' + exports.time(ts);let round = (number, up) => Math[up || false ? 'round' : 'floor'](number);exports.tsToSec = (ts, up) => round((ts || Date.now()) / 1000, up);exports.tsToMin = (ts, up) => round((ts || Date.now()) / 60000, up);exports.secToTs = sec => sec * 1000;exports.minToTs = min => min * 60000;exports.ts = { MINUTE: 60000, HOUR: 3600000, DAY: 86400000, WEEK: 604800000, MONTH: 18144000000, YEAR: 6622560000000 };

//# sourceMappingURL=date-compiled.js.map