/**
 * Created by stefka1210 on 23.12.15.
 */

var Xray            = require('x-ray');
var x               = Xray();

module.exports = function(url) {

    //console.log('scrap url: ' + url);

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
                    reject(err  + ' error 3');
                    return;
                }

                var tables = result.tables;
                var headers = tables.headers;
                var contents = tables.contents;

                var years = [];
                try {
                    for(var i=0;i<1/*headers.length*/;i++){
                        var columnTitles = headers[i].columnTitles;

                        for(var j=0;j<columnTitles.length;j++){
                            var year = columnTitles[j].replace('e','').trim();
                            years.push(year);
                        }
                    }
                } catch (e) {
                    console.log(e);
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

            // falls kgv nicht '-' ist (also NUMBER), push ihn in den array
            for (var m = 0; m < 5; m++) {
                if(array[m] === undefined)
                    console.log(array[m]);
                if(array[m] && array[m]['KGV'] != '-')
                    kgvArray.push(parseFloat(array[m]['KGV'].replace(',','.').replace(' ','')));
            }

            for(var n = 0; n < kgvArray.length; n++) {
                kgvSum += kgvArray[n];
            }

            kgvSum = kgvSum.toFixed(2);

            var kgvAverage = kgvSum / kgvArray.length;
            kgvAverage = kgvAverage.toFixed(4);

            //console.log('kgvArray: ' + kgvArray + ':::' + 'kgvArray.length: ' + kgvArray.length + ' kgvSum: ' + kgvSum + ' kgvAverage: ' + kgvAverage);


            //Umwandeln in NUMBER für die Punktberechnung
            try {
                var ekr = parseFloat(array[3]['Eigenkapitalrendite'].replace(',','.').replace(' ',''));
            } catch (e) {
                console.log(e);
            }

            try {
                var ebitMarge = parseFloat(array[3]['EBIT-Marge'].replace(',','.').replace(' ',''));
            } catch (e) {
                console.log(e);
            }

            try {
                var ekq = parseFloat(array[2]['Eigenkapitalquote'].replace(',','.').replace(' ',''));
            } catch (e) {
                console.log(e);
            }

            try {
                var kgvNow = parseFloat(array[4]['KGV'].replace(',','.').replace(' ',''));
            } catch (e) {
                console.log(e);
            }
            try {
                var kgvYears = kgvArray.length;
            } catch (e) {
                console.log(e);
            }
            try {
                var eps = parseFloat(array[5]['Gewinnwachstum'].replace(',','.').replace(' ',''));
            } catch (e) {
                console.log(e);
            }

            //calculate Points for Eigenkapitalrendite - ekr, reward für kgvpoints, quantity und minQuantity für kgvAverage
            function calcPoints(reward, top, bottom, value, quantity, minQuantity) {
                var points = 0;

                if (reward == 'max'&& value >= top && quantity >= minQuantity) {
                    points = 1;
                } else if (reward == 'max'&& value <= bottom) {
                    points =  -1;
                } else if (reward == 'min'&& value <= top) {
                    points =  1;
                } else if (reward == 'min'&& value >= bottom) {
                    points =  -1;
                } else {
                    points = 0;
                }

                return points;
            }

            var ekrPoints = calcPoints('max',20,10,ekr,0,0);
            var ebitMargePoints = calcPoints('max',12,6,ebitMarge,0,0);
            var ekqPoints = calcPoints('max',25,15,ekq,0,0);
            var kgvNowPoints = calcPoints('min',12,16,kgvNow,0,0);
            var kgvAvgPoints = calcPoints('min',12,16,kgvAverage,kgvYears,3);
            var epsPoints = calcPoints('max',5,5,eps,0,0);

            var sumPoints = ekrPoints + ebitMargePoints + ekqPoints + kgvNowPoints + kgvAvgPoints + epsPoints;

            //console.log('--------ekrPoints:' + ekrPoints);
            //console.log('--------ebitMargePoints:' + ebitMargePoints);
            //console.log('--------ekqPoints:' + ekqPoints);
            //console.log('--------kgvNowPoints:' + kgvNowPoints);
            //console.log('--------epsPoints:' + epsPoints);
            //console.log('--------kgvAvgPoints:' + kgvAvgPoints);
            //console.log('--------sumPoints:' + sumPoints);

                var resultData =
                    {
                        ekr: ekr,
                        ebitMarge: ebitMarge,
                        ekq: ekq,
                        kgvNow: kgvNow,
                        kgvAvg: kgvAverage,
                        kgvYears: kgvYears,
                        eps: eps,
                        ekrPoints: ekrPoints,
                        ebitMargePoints: ebitMargePoints,
                        ekqPoints: ekqPoints,
                        kgvNowPoints: kgvNowPoints,
                        kgvAvgPoints: kgvAvgPoints,
                        epsPoints: epsPoints,
                        sumPoints: sumPoints
                    };

                resolve(resultData);

                console.log('scrapstep finished');

        });
    });
};
