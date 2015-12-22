/**
 * Created by stefka1210 on 19.12.15.
 */
// app/models/stock.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StockSchema   = new Schema({
    name: String,
    ofObjectId: [Schema.Types.ObjectId],
    kpiurl: String,
    ratesurl: String,
    indexMembership: [],
    watchlistMembership: [],
    timeOfLastScrap: String,
    lastQR: String,
    nextQR: String,
    kpis: {
        2011: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2012: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2013: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2014: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2015: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2016: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        },
        2017: {
            peg: String,                // PEG - Price-Earning to Growth-Ratio
            epsPercent: String,         // Gewinnwachstum
            kgv: String,                // Kursgewinnverhältnis
            epsEuro: String,            // Gewinn pro Aktie in EUR
            dividendRendite: String,    // Dividendenrendite
            dividendEuro: String,       // Dividende (netto) in EUR
            kcv: String,                // Kurs-Cashflow Verhältnis (KCV)
            cpsEuro: String,            // Cashflow pro Aktie in EUR
            speEuro: String,            // Umsatz pro Mitarbeiter in EUR
            revgroPercent: String,      // Umsatzwachstum
            revEuro: String,            // Umsatz in Mio. EUR
            pbRatio: String,            // Kurs-Buchwert-Verhältnis
            bookValueEuro: String,      // Buchwert pro Aktie in EUR
            accountStandard: String,    // Bilanzierungsmethode
            dynLev: String,             // dynam. Verschuldungsgrad
            lev: String,                // Verschuldungsgrad
            ekq: String,                // Eigenkapitalquote
            totalAssetsEuro: String,    // Bilanzsumme in Mio. EUR
            mcEbitda: String,           // Marktkapitalisierung/EBITDA
            mcEmployeeEuro: String,     // Marktkapitalisierung/Mitarbeiter in EUR
            mcSales: String,            // Marktkapitalisierung/Umsatz
            marketCap: String,          // Marktkapitalisierung in Mio. EUR
            taxRate: String,            // Steuerquote
            cfroi: String,              // Cashflow Return on Investment
            roa: String,                // Gesamtkapitalrendite - return on assets
            roe: String,                // Eigenkapitalrendite - return on equity
            ebitdaMargin: String,       // EBITDA-Marge
            ebitMargin: String,         // EBIT-Marge
            cashflowMargin: String      // Cashflow-Marge
        }
    }
});

module.exports = mongoose.model('Stock', StockSchema);