define(function(require, exports, module){
    var SingleChoice = require('single-choice');
    var MultiChoice = require('multi-choice');
    var TextInput = require('text-input');
    var SingleImg = require('single-img');
    var SingleChoiceText = require('single-choice-text');
    var MultiChoiceText = require('multi-choice-text');
    var RangeSlider = require('range-slider');
    var MultiImg = require('multi-img');
    var HuaYan = require('huayan');
    var JianCha = require('jiancha');

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
            case 5:
                comp = {
                    class: MultiImg,
                    tmpl: '#J-multi-img-tmpl' 
                };
                break;
            case 6:
                comp = {
                    class: SingleChoiceText,
                    tmpl: '#J-single-choice-text-tmpl' 
                };
                break;
            case 7:
                comp = {
                    class: MultiChoiceText,
                    tmpl: '#J-multi-choice-text-tmpl' 
                };
                break;
            case 8:
                comp = {
                    class: RangeSlider,
                    tmpl: '#J-range-slider-tmpl' 
                };
                break;
            case 9:
                comp = {
                    class: HuaYan,
                    tmpl: '#J-huayan-tmpl'
                };
                break;
            case 10:
                comp = {
                    class: JianCha,
                    tmpl: '#J-jiancha-tmpl'
                };
                break;
        }
        return comp;
    }

});
