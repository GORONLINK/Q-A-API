var mongoose = require('mongoose');

var choiceSchema = new mongoose.Schema({
    id: String,
    content : {type : String},
    question : {type : mongoose.Schema.Types.ObjectId, ref : 'question'},
    answer : {type : mongoose.Schema.Types.ObjectId, ref : 'answer'},
    ok : {type : Boolean},
	updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('choice', choiceSchema);