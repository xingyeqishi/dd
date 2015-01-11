define(function(require, exports, module){
    var SingleChoice = require('single-choice');
    var MultiChoice = require('multi-choice');
    var TextInput = require('text-input');
    var SingleImg = require('single-img');
    module.exports.get = function(type) {
        var comp = {};
        type = parseInt(type, 10);
        switch (type) {
            case 1:
                comp = {
                    class: SingleChoice,
                    tmpl: '#J-single-choice-tmpl' 
                };
                break;
            case 2:
                comp = {
                    class: MultiChoice,
                    tmpl: '#J-multi-choice-tmpl' 
                };
                break;
            case 3:
                comp = {
                    class: TextInput,
                    tmpl: '#J-text-input-tmpl' 
                };
                break;
            case 4:
                comp = {
                    class: SingleImg,
                    tmpl: '#J-single-img-tmpl' 
                };
                break;
        }
        return comp;
    }

});
