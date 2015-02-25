/*jshint node:true */
var cons = require('consolidate'),
    express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    compress = require('compression');

var mongoose = require('mongoose');
var appRoot = process.cwd();
var sfbRouter = require('./router/sfb');
var issueRouter = require('./router/issue');
var dataRouter = require('./router/data');
var done = false;

mongoose.connect('mongodb://localhost/sfb');
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
    app.locals.pretty = true;
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
    // 上传
    app.use(multer({ dest: './uploads/',
        rename: function (fieldname, filename) {
            return filename+Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            done=true;
        }
    })); 
    app.use('/static', express.static(appRoot + '/static'));
    app.use('/', express.static('./'));
    app.use('/uploads', express.static('./upload'));
    app.use('/data', dataRouter);
    app.use('/issue', issueRouter);
    app.use('/sfb', sfbRouter);
    app.use('/uploadPic', function(req, res) {
        if (done == true){
            res.json({imgUrl: req.files["files[]"].path});
        } 
    });
}
