exports.nodeAst = require('../gulpCore/nodeAst')
exports.removeAfterAdd = require('../gulpCore/removeAfterAdd')
const { spawn } = require('child_process')
const path = require('path');
exports.app = function(build,config){
    global.projectToSubPackageConfig = config;
    let commandType = {
        development: 'startToPackServe',
        production: 'mpWxSubMode'
    }
    process.env.TEST = JSON.stringify(config);
    const working = spawn(process.execPath, [
        require.resolve('gulp/bin/gulp.js'),
        commandType[build],
        '--type', 'mp-wexin',
        '--gulpfile', path.resolve(__dirname, '../gulpfile.js'),
        '--cwd', process.cwd()
    ], {
        cwd: process.cwd(),
        stdio: 'inherit',
        config: JSON.stringify(config)
    });
}
