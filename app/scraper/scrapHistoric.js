/**
 * Created by stefka1210 on 23.12.15.
 */

var Xray            = require('x-ray');
var x               = Xray({
  filters: {
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
});

module.exports = function(url) {

    //console.log('scrap url: ' + url);

    return new Promise(function(resolve, reject) {
        x(url,
            {
                tables: x('article.TIMESANDSALES', {
                    contents: x('tr', [{
                        // dates: ['time@datetime'],
                        date: 'time@datetime',
                        // rates: ['td.ZAHL']
                        rates: ['td.ZAHL']
                    }])



                })
            })(function(err, result) {
                if(err){
                    reject(err  + ' error 3');
                    return;
                }
                var tables = result.tables;
                var contents = tables.contents;

                console.log(result.tables.contents);
                //resolve(result.tables.contents);
        });
    });
};
