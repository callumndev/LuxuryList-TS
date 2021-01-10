process.env.NODE_ENV = process.argv.includes( '--development' ) ? 'development' : 'production';

const childProcess = require( 'child_process' );

let deleteCommand = process.env.NODE_ENV == 'development' ?
    'rmdir /S /Q dist' :
    'rm -rf dist';

childProcess.exec( deleteCommand );