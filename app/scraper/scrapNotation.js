/**
 * Created by stefka1210 on 23.12.15.
 */

var Xray            = require('x-ray');
var x               = Xray();

module.exports = function(url) {

    //console.log('scrap url: ' + url);

    return new Promise(function(resolve, reject) {
        x(url, 'div#exchangesLayer ul li a@href'

        )(function(err, result) {
                if(err){
                    reject(err  + ' error 3');
                    return;
                }

                try {
                    //extract the notation from the scraped url(stock + index)-unique-id
                    var notation = new RegExp("^.*notation=(\\d*)$").exec(result);

                    console.log(notation[1] + ' inside');

                    resolve(notation[1]);

                    console.log('notationScrap finished');

                } catch (e) {
                    console.log(e);
                }


        });
    });
};
