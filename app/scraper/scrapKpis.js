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

            var array = Object.keys(kpisPerYear).map(function (key) { return kpisPerYear[key]});
            console.log('array: ' + array[0]['Eigenkapitalrendite']);

                //console.log('test: ' + Object.keys(kpisPerYear[year]));

                var resultData =
                    {
                        ekr: array[0]['Eigenkapitalrendite'],
                        ebitMarge: array[0]['EBIT-Marge'],
                        ekq: array[0]['Eigenkapitalquote']
                    };

                resolve(resultData);

                console.log('scrapstep finished')

        });
    });
};