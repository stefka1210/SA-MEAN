/**
 * Created by stefka1210 on 23.12.15.
 */
var _ 				= require('lodash');
var Xray            = require('x-ray');
var x               = Xray(
//     {
//   filters: {
//     slice: function (value, start , end) {
//       return typeof value === 'string' ? value.slice(start, end) : value
//     }
//   }
// }
);

module.exports = function(url) {

    //console.log('scrap url: ' + url);

    return new Promise(function(resolve, reject) {
        x(url, {
            headers: x('thead', [{
                title: 'th',
                columnTitles: ['th.ZAHL']
            }]),
            rows: x('tr', [{
                values: ['td.ZAHL']
            }])
        }
            )(function(err, result) {
                if(err){
                    reject(err  + ' error 3');
                    return;
                }
                var rates = [];

                for(var j=1; j < result.rows.length; j++) {
                    var rate = {
                            date: _.trim(result.rows[j].values[0]),
                            start: result.rows[j].values[1],
                            high: result.rows[j].values[2],
                            low: result.rows[j].values[3],
                            end: result.rows[j].values[4],
                            volume: result.rows[j].values[5]
                    };

                    rates.push(rate);
                }
                resolve(rates);
        });
    });
};
