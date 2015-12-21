/**
 * Created by stefka1210 on 19.12.15.
 */
// app/models/stock.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StockSchema   = new Schema({
    name: String,
    ofObjectId: [Schema.Types.ObjectId],
    url: String,
    indexMembership: [],
    watchlistMembership: [],
    timeOfLastScrap: String,
    lastQR: String,
    nextQR: String,
});

module.exports = mongoose.model('Stock', StockSchema);