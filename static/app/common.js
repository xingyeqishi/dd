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
        addOption: function() {
            _bBox.on('click', '.J-add-option', function(e) {
                var cloneNode = $(this).prev().clone();
                var ndInput = cloneNode.find('input[type="text"]');
                var index = _bBox.find('.J-option').size() + 1;
                ndInput.val('选项' + index);
                cloneNode.insertBefore($(this));
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
