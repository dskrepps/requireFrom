/* 

Require from a directory relative to node_modules, flattening your require paths.

Example:
	Given project structure:
		node_modules/requirefrom/
		lib/some/complex/dir/module/module.js
		lib/otherModule/index.js

	The file module.js:
		var lib = require('requirefrom')('lib');
 		var otherModule = lib('otherModule');

	Would be equivalent to:
		var otherModule = require('../../../../otherModule');
*/

var path = require('path');
var pkg = require(__dirname + '/../../package.json');
var dirs = pkg.requireFrom;

var requireFrom = module.exports = function( fromPath ){
	return function( modulePath ){
		return require( path.normalize(
			__dirname + '/../../' + fromPath + '/' + modulePath
			) );
	}
}

if(dirs){
	for(dir in dirs){
		module.exports[dir] = requireFrom(dirs[dir]);
	}
}
