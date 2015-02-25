var express = require('express');
var router = express.Router();
var Sfb = require('../model/sfb');
var path = require('path');
var uuid = require('uuid');

// 新增随访表
router.post('/save', function(req, res) {
    var data = req.body;
    var newSfb = Sfb({
        id: uuid.v1(),
       data: data.data
    });
    newSfb.save(function(err) {
        if (err) {
            throw err;
        }
        console.log('sfb created');
    });
    res.status(200).json({ success: true});
});
// 修改随访表
router.get('/edit', function(req, res) {
    res.sendFile(path.join(__dirname , '../edit.html'));
});

// 查看随访表
router.get('/view', function(req, res) {
    //res.render('view', {id: req.query.id});
    res.sendFile(path.join(__dirname , '../views/view.html'));
    //res.render('view', {id: req.query.id});
});

router.get('/view.ajax', function(req, res) {
    var id = req.query.id;
    Sfb.findById(id, function(err, sfb) {
        if (err) {
            throw err
        }
        // 化验题
        var hyData = require('../huayan.json');
        var optionId = null;
        var data,
            _index = null,
            type,
            sfbData = JSON.parse(sfb.data);
        for (var i = 0; i < sfbData.length; i++) {
            var item = sfbData[i];
            if (item.type == 9 || item.type == 10) {
                _index = i;
                type = item.type;
                item.options.some(function(i, index) {
                    console.log(i);
                    if (i.type == 'select') {
                        optionId = i.value;
                        item.options.splice(index, 1);
                    }
                });
                if (item.type == 9) {
                    hyData.data.map(function(item) {
                        if (item.id == optionId) {
                            data = item.items;
                        }
                    });
                    data = data.concat(sfbData[_index].options);
                    sfbData[_index].options = data;
                    sfbData[_index].hyId = optionId;
                } else if (item.type == 10) {
                    sfbData[_index].jcData = require('../jiancha.json').data;
                }
            }
        }
        
        // 检查题
        res.json(sfbData);
    });
});

// 随访表列表
router.get('/list', function(req, res) {
   var data = [];
   Sfb.find({}, function(err, sfbs) {
        if (err) {
            throw err
        }
        sfbs.forEach(function(item) {
            data.push(item._id);
        });
        res.render('list', {data: data});
   });
});

router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
});

module.exports = router;
