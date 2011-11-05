Intro
=====

CRC means 'Cyclic Redundancy Check' and is a way to checksum data. It is a simple algorithm based on polynomials and is used in such projects as gzip.

This module only works with UTF-8 strings.

Install
=======

To use in node:

`npm install crc32`

To use in the browser, use pakmanager.

API
===

    var crc32 = require('crc32');

	// runs on some string using a table
	crc32(someString);

	// runs on some string using direct mode
	crc32(someString, true);

	// directly run on someString using a table
	crc32.table(someString);

	// directly run on someString using direct mode
	crc32.direct(someString);
