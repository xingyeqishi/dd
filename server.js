/*jshint node:true */
var cons = require('consolidate'),
    express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression');

var appRoot = process.cwd();

module.exports = function createServer(app) {

    initAppConfig(app);

    initMiddleware(app);

    return app;
};
/**
 * 初始化配置项
 */
function initAppConfig(app) {
    app.enable('view cache');
    app.enable('strict routing');
    app.enable('x-powered-by');
    app.engine('handlebars', cons.handlebars);
    app.set('view engine', 'handlebars');
    app.set('views', appRoot + '/views');
}
/**
 * 初始化中间件
 */
function initMiddleware(app) {
    app.use(compress());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
    app.use('/static', express.static(appRoot + '/static'));
    app.use('/', express.static('./'));
}
