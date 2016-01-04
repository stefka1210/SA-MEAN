/**
 * Created by stefka1210 on 31.12.15.
 */
var Promise = require('bluebird');
var Xray = require('x-ray');
var x = Xray();

var url = 'http://www.onvista.de/aktien/fundamental/Siemens-Aktie-DE0007236101';

var getTitle = Promise.promisify(
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
        })
);


getTitle().then(function(result) {
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
        console.log(kpisPerYear['2014']['Eigenkapitalrendite']);

        //var resultData =
        //{
        //    ekr: kpisPerYear['2014']['Eigenkapitalrendite'],
        //    ebitMarge: kpisPerYear['2014']['EBIT-Marge'],
        //    ekq: kpisPerYear['2014']['Eigenkapitalquote']
        //};

        //callback(resultData);

        console.log('scraper finished')
}



);