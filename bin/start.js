/*jshint node:true*/
var fs = require('fs');
var path = require('path');

var browserify = require('browserify');
var watchify = require('watchify');
var glob = require('glob');

var cwd = process.cwd();

// TODO 需要确定所有 browser 相关文件的构建入口
// specified package - main module file
// or
// specified module file
// or
// multiple specified module file
var entrances = glob.sync('*/*.js');
entrances = entrances.filter(function(file) {
    var dirname = path.dirname(file);
    if (dirname.search(/(bin|util)/) !== -1) {
        return false;
    }
    var basename = path.basename(file);
    if (basename.search('-browser.js') !== -1) {
        return false;
    }
    return true;
});
/*
apply(process.cwd() + '/deal/detail.js');
entrances.forEach(function(entrance) {
    apply(path.join(cwd, entrance));
});
*/
apply(path.join(cwd, 'static/index.jsx'));


function apply(file) {
    var isDebug = process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === undefined;
    var filename = require.resolve(file);
    var args = {
        cache: {},
        packageCache: {},
        debug: isDebug,
        entries: [ filename ]
    };
    var b = browserify(args);
    if (isDebug) {
        b = watchify(b);
    }
    //b.plugin('mtfe_livereloadify');
    var relname = path.relative(cwd, filename);
    var extname = path.extname(relname);
    var bundlename = path.join(path.dirname(relname),
                               path.basename(relname, extname) + '-browser.js');

    function onFinish() {
        console.log(filename + ' -> ' + bundlename + ' bundled! exposed as ');
    }
    function onError(err) {
        console.error(err.message);
        if (err.stack) {
            console.error(err.stack);
        }
    }
    function onLog(msg) {
        console.log(msg);
    }
    function bundle() {
        b.bundle()
        .on('error', onError)
        .pipe(fs.createWriteStream(bundlename))
        .on('error', onError)
        .on('finish', onFinish);
    }
    bundle();
    b.on('update', bundle);
    b.on('log', onLog);
}

