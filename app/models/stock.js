/**
 * Created by stefka1210 on 19.12.15.
 */
// app/models/stock.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StockSchema   = new Schema({
    name: String,
    kpiurl: String,                                         // url für die Kennzahlen - kpis
    ratesurl: String,
    notation: String,                                  // url für die historischen Kurse - rates
    indexMembership: { type : Array , "default": [] },     // array von den Indices in welche die Aktie gelistet ist
    watchlistMembership: { type : Array , "default": [] }, // array von den watchlists in welche die Aktie steht
    lastQR: Date,                                           // Zeitpunkt des letzten Quartalsberichts
    nextQR: Date,                                           // Zeitpunkt des nächsten Quartalsberichts

    kpiScraps: [{
        timeOfScrap: { type: Date, default: Date.now },
        ekr: {type: String },
        ebitMarge: { type: String },                                      // EBIT-Marge
        ekq: { type: String },                                            // Eigenkapitalquote
        kgvNow: { type: String },                                         // aktuelles KGV
        kgvAvg: { type: String },                                         // KGV-Jahresdurchnitt
        kgvYears: { type: String },                                       // Anzahl der vergangenen KGVs die den Durchschnitt (kgvAvg) bilden
        eps: { type: String },                                            // Gewinnwachstum
        priceSixMonth: { type: String },                                  // Kurs vor 6 Monaten
        priceOneYear: { type: String },                                   // Kurs vor 1 Jahr
        priceMomentum: { type: String },                                  // Kursmomentum
        analystCount: { type: String },                                   // Anzahl der Analysten
        analystGrade: { type: String },                                   // Note der Analysten
        qrReaction: { type: String },                                     // Reaktion auf den letzten Quartalsbericht
        earnRevision: { type: String },

        ekrPoints: { type: String},
        ebitMargePoints: { type: String},
        ekqPoints: { type: String},
        kgvNowPoints: { type: String},
        kgvAvgPoints: { type: String},
        epsPoints: { type: String},
        sumPoints: { type: Number}
    }],
    rates: [
         {
            date: {type: String},
            start: {type: String},
            high: {type: String},
            low: {type: String},
            end: {type: String},
            volume: {type: String}
        }
    ]

});

module.exports = mongoose.model('Stock', StockSchema);
