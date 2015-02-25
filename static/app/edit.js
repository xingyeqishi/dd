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

    $.get('/sfb/view.ajax', {id:localStorage.getItem('sid')}, function(res) {
        var data = res;
        data.forEach(function(item) {
            console.log(item);
            var comp = CompMap.get(item.type);
            var div = $('<div data-type="' + item.type + '" class="J-widget ui-sortable-handle" style="display:block;"></div>');
            var html = Handlebars.compile($(comp.tmpl).html())(item);
            div = div.append(html);
            $('.J-right').append(div);
            comp.class.init(div);
        });
    });

    $('.J-save-btn').click(function(e) {
        var ws = $('.J-form .J-widget-item');
        var arr = [];
        ws.each(function(index, item) {
            item = $(item);
            var options = [];
            item.find('.J-option-name').each(function(index, val) {
                var tagName = $(val).get(0).tagName.toLowerCase();
                options.push({
                    type: tagName,
                    value: $(val).val()
                });
            });
            var data = {
                type: item.attr('widget-type'),
                title: item.find('.J-title').val(),
                options: options
            };
            arr.push(data);
        });
        $.post('/sfb/save', {data: JSON.stringify(arr)}, function(res) {
            if (res.success) {
                alert('保存成功');
            }
        });
    });
});
