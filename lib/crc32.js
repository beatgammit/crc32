(function () {
	'use strict';

	var table = [],
		poly = 0xEDB88320; // reverse polynomial

	// build the table
	function makeTable() {
		var c, n, k;

		for (n = 0; n < 256; n += 1) {
			c = n;
			for (k = 0; k < 8; k += 1) {
				if (c & 1) {
					c = poly ^ (c >>> 1);
				} else {
					c = c >>> 1;
				}
			}
			table[n] = c >>> 0;
		}
	}

	function strToArr(str) {
		// sweet hack to turn string into a 'byte' array
		return Array.prototype.map.call(str, function (c) {
			return c.charCodeAt(0);
		});
	}

	function crcDirect(val) {
		var crc  = 0xFFFFFFFF; // initial contents of LFBSR

		(typeof val === 'string' ? strToArr(val) : [val]).forEach(function (b) {
			var temp = (crc ^ b) & 0xff,
				i;

			// read 8 bits one at a time
			for (i = 0; i < 8; i += 1) {
				if ((temp & 1) === 1) {
					temp = (temp >>> 1) ^ poly;
				} else {
					temp = (temp >>> 1);
				}
			}
			crc = (crc >>> 8) ^ temp;
		});

		// flip bits
		return crc ^ -1;
	}

	function crcTable(val) {
		var arr = (typeof val === 'string') ? strToArr(val) : [val],
			crc = 0 ^ -1;

		arr.forEach(function (b) {
			crc = (crc >>> 8) ^ table[(crc ^ b) & 0xff];
		});

		return crc ^ -1;
	}

	// build the table
	makeTable();

	module.exports = function (val, direct) {
		var val = direct ? crcDirect(val) : crcTable(val);

		// convert to 2's complement hex
		return (val >>> 0).toString(16);
	};
	module.exports.direct = crcDirect;
	module.exports.table = crcTable;
}());
