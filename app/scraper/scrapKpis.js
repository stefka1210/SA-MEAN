/**
 * Created by stefka1210 on 23.12.15.
 */

var Xray            = require('x-ray');
var x               = Xray();

module.exports = function(url) {

    return new Promise(function(resolve, reject) {
        x(url,
            {
                tables: x('article.KENNZAHLEN', {
                    headers: x('thead', [{
                        title: 'th',
                        columnTitles: ['th.ZAHL']
                    }]),
                    contents: x('tbody', [{
                        kpis: ['td.INFOTEXT'],
                        values: ['td.ZAHL']
                    }])
                })
            })(function(err, result) {
                if(err){
                    reject(err);
                    return;
                }

                var tables = result.tables;
                var headers = tables.headers;
                var contents = tables.contents;

                var years = [];
                for(var i=0;i<1/*headers.length*/;i++){
                    var columnTitles = headers[i].columnTitles;

                    for(var j=0;j<columnTitles.length;j++){
                        var year = columnTitles[j].replace('e','').trim();

                        years.push(year);
                    }
                }

                var kpisPerYear = {};
                for(var i=0;i<contents.length;i++){
                    var kpis = contents[i].kpis;
                    var values = contents[i].values;
                    var valuesPerKpi = values.length / kpis.length;

                    for(var j=kpis.length-1; j>=0; j--){
                        var kpi = kpis[j];

                        for(var k=values.length-1; k>=j*valuesPerKpi; k--){
                            var year = years[k-j*valuesPerKpi];

                            if(year == undefined)
                                continue;

                            if(kpisPerYear[year] === undefined)
                                kpisPerYear[year] = {};

                            kpisPerYear[year][kpi] = values[k] && values[k].trim();

                        }
                    }
                }

            // umwandeln von kpisPerYear in einen Array, sonst nur mit genauem String ansprechbar
            var array = Object.keys(kpisPerYear).map(function (key) { return kpisPerYear[key]});


            // Berechne kgvAvg und kgvAvg.length (Durchschnitts-KGV)
            var kgvArray = [];
            var kgvSum = 0;

            for (var m = 0; m < 5; m++) {
                if(array[m]['KGV'] != '-')
                    kgvArray.push(parseFloat(array[m]['KGV'].replace(',','.').replace(' ','')));
            }

            for(var n = 0; n < kgvArray.length; n++) {
                kgvSum += kgvArray[n];
            }

            kgvSum = kgvSum.toFixed(2);

            var kgvAverage = kgvSum / kgvArray.length;
            kgvAverage = kgvAverage.toFixed(4);

            //console.log('kgvArray: ' + kgvArray + ':::' + 'kgvArray.length: ' + kgvArray.length + ' kgvSum: ' + kgvSum + ' kgvAverage: ' + kgvAverage);

                var resultData =
                    {
                        ekr: array[3]['Eigenkapitalrendite'],
                        ebitMarge: array[3]['EBIT-Marge'],
                        ekq: array[3]['Eigenkapitalquote'],
                        kgvNow: array[3]['KGV'],
                        kgvAvg: kgvAverage,
                        kgvYears: kgvArray.length
                    };

                resolve(resultData);

                console.log('scrapstep finished')

        });
    });
};