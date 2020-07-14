var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    id: String,
	content : {type : String},	
	updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('question', questionSchema);