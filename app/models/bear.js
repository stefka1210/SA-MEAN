/**
 * Created by stefka1210 on 19.12.15.
 */
// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);