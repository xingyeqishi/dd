define(function(require, exports, module){
    var CompMap = require('comp-map');

    $.get('/issue/view.ajax', {id: localStorage.getItem('iid')}, function(res) {
        showItem(res.sfb);
        changeInputName();
        fillValue(res.issue);
    });

    function fillValue(data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                $('.J-main [name="' + i +'"]').each(function(index, item) {
                    item = $(item);
                    var tagName = item.get(0).tagName.toLowerCase();
                    if (tagName === 'input') {
                        var type = item.prop('type');
                        if (type === 'radio') {
                            if (item.val() == data[i]) {
                                item.prop('checked', true);
                            }
                        } else if (type === 'checkbox') {
                            if (_.contains(data[i], item.val())) {
                                item.prop('checked', true);
                            }
                        }
                    } else if (tagName === 'textarea') {
                        item.val(data[i]);
                    } else if (tagName === 'select') {
                        item.val(data[i]);
                    }
                });
            }
        }
    }

    function showItem(data) {
        data.map(function(item) {
            var comp = CompMap.get(item.type);
            var tmpl = Handlebars.compile($(comp.tmpl).html());
            $(".J-main").append(tmpl(item));
        });
    }

    function changeInputName() {
        $(".J-main .J-issue").each(function(index, item) {
            item = $(item);
            item.find('.J-option').each(function(i, v) {
                var type = $(v).get(0).tagName.toLowerCase();
                if (type === 'input') {
                    type = $(v).prop('type');
                }
                var name = $(v).attr('name');
                $(v).attr('name', name + type + index);
            }); 
        });
    }

    $('.J-submit').click(function() {
        var data = $('.J-main').serialize();
        $.post('/issue/save', {data: data}, function(res) {
            console.log(res);
        });
    });
});
