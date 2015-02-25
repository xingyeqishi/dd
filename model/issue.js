var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
    //id: { type: Number, required: true, unique: true},
    id: { type: String, required: true, unique: true},
    data: { type: String},
    created_at: Date
}, {autoIndex: true});

issueSchema.pre('save', function(next) {
    var currentDate = new Date();

    this.created_at = currentDate;
    next();
});

var Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
