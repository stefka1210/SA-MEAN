

module.exports = function() {

    var Xray            = require('x-ray');
    var x               = Xray();
    var express			= require('express');
    var Bear     		= require('../models/bear');

    x('http://www.wikifolio.com/de/STRAQUA', {
        name: 'title',
        image: x('https://images.google.com', 'title')
    })(function(err, obj) {
    console.log('Neuer Bär mit Namen: ' + obj.name); // => { name: 'Google', image: 'Google Images' }

            var bear = new Bear();      // create a new instance of the Bear model
            bear.name = obj.name;  // set the bears name (comes from the request)

            // save the bear and check for errors
            bear.save(function(err) {
                if (err)
                    console.log(err);
                console.log('Bear created!');
            });

    })

};