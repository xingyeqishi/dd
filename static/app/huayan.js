define(function(require, exports, module){
    var _bBox = null;
    var data;
    var $Util = require('common');
   var itemTmpl;
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
        $.get('/data/huayan.ajax', {}, function(res) {
            data = res.data;
            renderView();
        });
    }
    function renderView() {
       var tmpl = Handlebars.compile($('#J-hylist-tmpl').html()); 
       $('.J-huayan-container').html(tmpl({data: data}));
         itemTmpl = Handlebars.compile($('#J-hyitem-tmpl').html());
       $('.J-hyitem-info').html(
            itemTmpl({data: data[0].items})
       );
       chooseHy();
    }
    function chooseHy() {
        $('.J-choose-hy').on('change', function(e) {
            var hyId = $(e.target).val();
            data.map(function(item, index) {
                if (item.id == hyId) {
                   $('.J-hyitem-info').html(
                        itemTmpl({data: data[index].items})
                   );
                }
            });
        });
    }
    module.exports = {
        init:init
    };

});
