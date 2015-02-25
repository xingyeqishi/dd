define(function(require, exports, module){
    var CompMap = require('comp-map');
    var id = localStorage.getItem('sid');
    $('.J-id').val(id);
    $.get('/sfb/view.ajax', {id: id}, function(res) {
        var data;
        if (_.isObject(res)) {
            data = res;
        } else {
            data = JSON.parse(res);
        }
        showItem(data);
        changeInputName();
    });

    function showItem(data) {
        data.map(function(item) {
            var comp = CompMap.get(item.type);
            var tmpl = Handlebars.compile($(comp.tmpl).html());
            var ndStr = tmpl(item);
            ndStr = $(".J-main").append(ndStr);
            if (item.type == 8) {
                var dataArr = [];
                $(ndStr).find('.J-option').each(function(index, item) {
                    dataArr.push(Number($(item).val())); 
                })
                $(ndStr).find('.J-slider').slider({
                    max: dataArr[0],
                    min: dataArr[1],
                    step: dataArr[2],
                    stop: function(e, ui) {
                        console.log(ui.value);
                    }
                });
                console.log($(ndStr).find('.J-slider').html());

            }
        });
    }

    function changeInputName() {
        $(".J-main .J-issue").each(function(index, item) {
            item = $(item);
            item.find('.J-option').each(function(i, v) {
                var name = $(v).attr('name');
                var type = $(v).get(0).tagName.toLowerCase();
                if (type === 'input') {
                    type = $(v).prop('type');
                }
                if ($(v).is(':checkbox')) {
                    $(v).attr('name', name + type + index +'[]');
                } else {
                    $(v).attr('name', name + type + index);
                }
            }); 
        });
    }

    $('.J-submit').click(function() {
        var data = $('.J-form').serializeJSON();
        console.log(data);
        data = JSON.stringify(data);
        $.post('/issue/save', {data: data}, function(res) {
            console.log(res);
        });
    });
});
