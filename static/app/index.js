define(function(require, exports, module){
    var SingleChoice = require('single-choice');
    var MultiChoice = require('multi-choice');
    var CompMap = require('comp-map');

    $(".J-left-nav").sortable({
        connectWith: ".connectedSortable",
        placeholder: 'no-placeholder',
        helper: function (e, li) {
            this.copyHelper = li.clone().insertAfter(li);
            $(this).data('copied', false);
            return li.clone();
        },
        stop: function () {
            var copied = $(this).data('copied');
            if (!copied) {
                this.copyHelper.remove();
            }
            this.copyHelper = null;
        }
    });
    $('.J-right').sortable({
        receive: function(event, ui) {
            ui.sender.data('copied', true);
            showItem(ui.item);
        }
    });
    $('.J-right').on('click', '.J-y-add', function(e) {
        var ndContainer = $(this).parents('.J-widget');
        ndContainer.insertBefore(ndContainer.prev());
    });
    $('.J-right').on('click', '.J-y-reduce', function(e) {
        var ndContainer = $(this).parents('.J-widget');
        ndContainer.insertAfter(ndContainer.next());
    });
    function showItem(item) {
        var type = item.data('type');
        var cloneNode = null;
        var comp = CompMap.get(type);
        cloneNode = $(comp.tmpl).html();
        item.html(cloneNode);
        comp.class.init(item);
    }
});
