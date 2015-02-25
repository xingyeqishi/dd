define(function(require, exports, module){
    var _bBox = null;
    var $Util = require('common');
    var data;
    function init(bBox) {
        _bBox = $(bBox);
        getData();
        bindUI();
    }
    function bindUI() {
        $Util.setBox(_bBox);
        $Util.deleteOper();
        $Util.addOption();
        $Util.showEdit();
        _bBox.find('.J-copy').click(function(e) {
            var cloneNode = _bBox.clone();
            cloneNode.insertAfter(_bBox);
            init(cloneNode);
        });
    }
    function getData() {
        $.get('/data/jiancha.ajax', {}, function(res) {
            data = res.data;
            renderView();
        });
    }
    function renderView() {
       var tmpl = Handlebars.compile($('#J-jclist-tmpl').html()); 
       $('.J-jc-container').html(tmpl({data: data}));
    }
    module.exports = {
        init:init
    };

});
