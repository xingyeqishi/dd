var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Issue = require('../model/issue');
var Sfb = require('../model/sfb');
var uuid = require('uuid');
var path = require('path');

// 填写随访表
router.post('/save', function(req, res) {
    var data = req.body;
    var newIssue = Issue({
        id: uuid.v1(),
       data: JSON.stringify(data.data)
    });
    newIssue.save(function(err) {
        if (err) {
            throw err;
        }
        console.log('issue created');
    });
    res.status(200).json({ success: true});
});
// 填写的随访表列表
router.get('/list', function(req, res) {
   var data = [];
   Issue.find({}, function(err, issues) {
        if (err) {
            throw err
        }
        issues.forEach(function(item) {
            data.push(item._id);
        });
        res.render('list-issue', {data: data, type: 'issue'});
   });
});

// 查看填写随访表
router.get('/view', function(req, res) {
    res.sendFile(path.join(__dirname , '../views/view-issue.html'));
});

router.get('/view.ajax', function(req, res) {
    var id = req.query.id;
    Issue.findById(id, function(err, issue) {
        if (err) {
            throw err;
        }
        var data = JSON.parse(issue.data);
        data = JSON.parse(data);
        var id = data.issueId;
        Sfb.findById(id, function(err, sfb) {
            if (err) {
                throw err;
            }
            // 对检查单进行特殊处理，根据选中的检查单获取各个checkbox选项
            var hyData = require('../huayan.json');
            var optionId = null;
            var d,
                _index,
                type,
                sfbData = JSON.parse(sfb.data);
            for (var i = 0; i < sfbData.length; i++) {
                var item = sfbData[i];
                if (item.type == 9 || item.type == 10) {
                    _index = i;
                    type = item.type;
                    item.options.some(function(i, index) {
                        if (i.type == 'select') {
                            optionId = i.value;
                            item.options.splice(index, 1);
                        }
                    });
                }
            }
            if (_index !== null) {
                if (type == 9) {
                    hyData.data.map(function(item) {
                        if (item.id == optionId) {
                            d = item.items;
                        }
                    });
                    d = d.concat(sfbData[_index].options);
                    sfbData[_index].options = d;
                    sfbData[_index].hyId = optionId;
                } else if (type == 10) {
                    sfbData[_index].jcData = require('../jiancha.json').data;
                }
            }
            res.json({
                sfb: sfbData,
                issue: data 
            });
        });
    });
});
module.exports = router;
