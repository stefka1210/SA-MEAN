'use strict';

var express			= require('express');
var router 			= express.Router();    // get an instance of the express Router
var Stock     		= require('./models/stock');
var ScrapKpis    	= require('./scraper/scrapKpis');
var ScrapHistoric    	= require('./scraper/scrapHistoric');

module.exports = function(app) {

// server routes ===========================================================

	// CRUD-Api ===========================================================
	// middleware to use for all requests
		router.use(function(req, res, next) {
			// do logging
			console.log('Something is happening.');
			next(); // make sure we go to the next routes and don't stop here
		});

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
		router.get('/', function(req, res) {
			res.json({ message: 'hooray! welcome to our api!' });
		});


    // create a stock (accessed at POST http://localhost:8080/api/addStock)
	router.route('/addStock')

		.post(function(req, res) {

			var stock = new Stock();      // create a new instance of the Stock model
			stock.name = req.body.name.toLowerCase();  // set the stock name (comes from the request)
			stock.kpiurl = req.body.kpiurl;
			stock.ratesurl = req.body.ratesurl;
			stock.indexMembership.push(req.body.indexMembership.toLowerCase());


			// save the stock and check for errors
			stock.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Stock '+ stock.name +' created!'});
			});
		});

    router.route('/scrapKpis/:index')
         //scrap the kpis
        .post(function(req, res, next) {

            console.log('scrapKpis for: ' + req.params.index);

			Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {

            // Stock.find(function(err, stocks) {
                if (err)
                    res.send(err  + ' error 2');


				function getKpis(index){
					var stock = stocksInIndex[index];

					if(index < stocksInIndex.length) {
						console.log('getKpis for: ' + stock.kpiurl);
						console.log('index: ' + index + '/ ' + stocksInIndex.length);

						ScrapKpis(stock.kpiurl).then(function(result){
							console.log(result);

							stock.kpiScraps.push(result);
							stock.save(function (err) {
								if (err) return handleError(err);
									//res.send(err);
								if(index < stocksInIndex.length)
									getKpis(++index);
								if(index == stocksInIndex.length)
									res.send('scraper finished');
									console.log('scraper finished for: ' + stock.name);
							});
						}, function(error){
							console.error(error + ' error 1');
						});
					} else {
						console.log('indexscraping finished for: ' + req.params.index);
					}
				}
				if(stocksInIndex && stocksInIndex.length > 0)
					getKpis(0);
            });
        });

	router.route('/scrapRates')
		//scrap the historic rates of the stock
		.post(function(req, res, next) {
			var historicUrl = 'http://www.onvista.de/onvista/times+sales/popup/historische-kurse/?notationId=161766&dateStart=06.10.2011&interval=M1&assetName=huhu&exchange=haha';
			ScrapHistoric(historicUrl).then(function(result){
				console.log("outerResult: " + result);

				});
			}, function(error){
				console.error(error + ' outererror');
			});




	router.route('/find_name')
	// find a stock by name (accessed at GET http://localhost:8080/api/find_name)
		.get(function(req, res) {


			Stock.findOne({ 'name': 'Siemens' },   {} , function (err, lastKpiScrap) {
				if (err) return handleError(err);

				var length = lastKpiScrap.kpiScraps.length;

				//der letzte kpiScrap der Aktie
				console.log(lastKpiScrap.kpiScraps[length-1]);
				res.json(lastKpiScrap.kpiScraps[length-1]);
			})
		});

	// hol alle stocks die im x-index sind (accessed at GET http://localhost:8080/api/findbyindex/dax)
	router.route('/findbyindex/:index')
		// finde eine Aktie mit indexMembership dax
		.get(function(req, res) {

			//Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {
			//	if (err) return handleError(err);
            //
			//		console.log(stocksInIndex[0]);
			//		res.json(stocksInIndex[0]);
            //
			//})

			var query = Stock.find({'indexMembership': req.params.index});
			console.log('----> Stocks für '+ req.params.index + ' gesendet');
			query
                .slice('kpiScraps', -1)
                .exec(function (err, someValue) {
					if (err) return next(err);
					res.json(someValue);

				});

		});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
	app.use('/api', router);


	//test
	app.post('/scraper', function (req, res, next) {
		console.log('Accessing the secret section ...');

		res.json({ message: 'Scraper(Server) ausgelöst' });


		next(); // pass control to the next handler
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
