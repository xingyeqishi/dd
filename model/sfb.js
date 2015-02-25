var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sfbSchema = new Schema({
    //id: { type: Number, required: true, unique: true},
    id: { type: String, required: true, unique: true},
    data: { type: String},
    created_at: Date
}, {autoIndex: true});

sfbSchema.pre('save', function(next) {
    var currentDate = new Date();

    this.created_at = currentDate;
    next();
});

var Sfb = mongoose.model('Sfb', sfbSchema);

module.exports = Sfb;
