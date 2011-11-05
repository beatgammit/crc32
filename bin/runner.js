(function () {
	'use strict';

	var fs = require('fs'),
		path = require('path'),
		crc32 = require('../lib/crc32'),
		name = (process.argv[1].indexOf(__filename) < 0 ? '' : 'node ') + path.basename(process.argv[1]),
		usage = [
			'Usage:',
			'',
			name + ' file1.txt [, file2.txt...]'
		].join('\n'),
		files;

	if (process.argv.length === 2) {
		console.log(usage);
		return;
	}

	files = process.argv.slice(2);

	files.forEach(function (file) {
		var data = fs.readFileSync(file, 'utf8');

		console.log(file, crc32(data));
	});
}());
