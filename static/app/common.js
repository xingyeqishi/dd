define(function(require, exports, module){
    var _bBox = null;
    function _deleteOption() {
        _bBox.on('click', '.J-delete-option', function(e) {
            $(this).parents('.J-option').remove();
        });
    }
    module.exports = {
        setBox: function(bBox) {
            _bBox = bBox;
        },
        deleteOper: function() {
            _bBox.find('.J-delete').click(function(e) {
                if (window.confirm('确定删除吗?')) {
                    _bBox.remove();
                }
            });
            _deleteOption();
        },
        addOption: function(changeInput) {
            _bBox.on('click', '.J-add-option', function(e) {
                e.stopPropagation();
                var ndTarget = $(this);
                var cloneNode = ndTarget.prev().clone();
                var ndInput = cloneNode.find('input[type="text"]');
                if (ndInput && changeInput) {
                    var index = ndTarget.parent().find('.J-option').size() + 1;
                    ndInput.val('选项' + index);
                }
                cloneNode.insertBefore(ndTarget);
            });
        },
        showEdit: function() {
            _bBox.on('focus', 'input, textarea', function(e) {
                $(this).addClass('item--edit');
            });
            _bBox.on('blur', 'input, textarea', function(e) {
                $(this).removeClass('item--edit');
            });
        }
    };
});
