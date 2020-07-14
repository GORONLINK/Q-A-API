var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    id: String,
    question : {type : mongoose.Schema.Types.ObjectId, ref : 'question'},
	content : {type : String},
	updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('answer', answerSchema);