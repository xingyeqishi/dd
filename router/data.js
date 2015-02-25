var express = require('express');
var router = express.Router();
router.get('/huayan.ajax', function(req, res) {
    res.json(require("../huayan.json"));
});
router.get('/jiancha.ajax', function(req, res) {
    res.json(require("../jiancha.json"));
});
module.exports = router;
