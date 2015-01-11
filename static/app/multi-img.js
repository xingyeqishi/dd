define(function(require, exports, module){
    var _bBox = null;
    var $Util = require('common');
    function init(bBox) {
        _bBox = $(bBox);
        bindUI();
    }
    function bindUI() {
        $Util.setBox(_bBox);
        $Util.deleteOper();
        $Util.addOption(false);
        $Util.showEdit();
        _bBox.find('.J-slider').slider();
        _bBox.find('.J-copy').click(function(e) {
            var cloneNode = _bBox.clone();
            cloneNode.insertAfter(_bBox);
            init(cloneNode);
        });
    }
    module.exports = {
        init:init
    };
});
