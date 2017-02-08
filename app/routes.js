'use strict';

var express			= require('express');
var _ 				= require('lodash');
var moment			= require('moment');
var router 			= express.Router();    // get an instance of the express Router
var Stock     		= require('./models/stock');
var ScrapKpis    	= require('./scraper/scrapKpis');
var ScrapNotation    	= require('./scraper/scrapNotation');
var ScrapHistoric    	= require('./scraper/scrapHistoric');

//moment.locale('de');
// var startDate = moment().locale('de');
// startDate = startdate.subtract(3, "month").format("DD.MM.YYYY");
// console.log('calcBackDate: ' + startDate);

// var datetime = new Date();
// var currentdate = datetime.getDate() + "."
//                 + (datetime.getMonth()+1)  + "."
//                 + (datetime.getFullYear()-1) //TODO: ziehe timeUnit und timeAmount von currentdate ab
//
// 				console.log(currentdate);
// 				console.log(datetime);

module.exports = function(app) {

	function handleError(err) {
  		console.log("Got an error", err);
	};

// server routes ==========================================================

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

	router.route('/getStockNames/:index')

		.post(function(req, res, next) {

		//	const stream = Stock.find({ 'indexMembership': req.params.index }).stream();

			// Print every document that matches the query, one at a time
		//	stream.on('data', doc => { console.log(doc); });



			const cursor = Stock.find({ 'indexMembership': req.params.index }).cursor();

			// Print the first document. Can also use callbacks
			cursor.next.then(doc => {
				console.log(doc);
			});

			// const message = 'huhu, names läuft: ';
			// console.log(message + req.params.index);

	// cursor.eachAsync(doc => superagent.post('/saveDoc', doc)).
	//   then(() => console.log('done!'));

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

		router.route('/scrapNotation/:index')
	         //scrap the kpis
	        .post(function(req, res, next) {
	            console.log('Scrap notation for: ' + req.params.index);
				Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {

	                if (err)
	                    res.send(err  + ' error 2 notation');

					function getNotations(index){
						var stock = stocksInIndex[index];

						if(index < stocksInIndex.length) {
							console.log('getNotation for: ' + stock.kpiurl);
							console.log('index: ' + index + '/ ' + stocksInIndex.length);

							ScrapNotation(stock.kpiurl).then(function(result){
								console.log(result);

								stock.notation = result;
								stock.save(function (err) {
									if (err) return handleError(err);
										// res.send(err);
									if(index < stocksInIndex.length)
										getNotations(++index);
									if(index == stocksInIndex.length)
										res.send('Notationscraper finished');
										console.log('Notationscraper finished for: ' + stock.name);
								});
							}, function(error){
								console.error(error + ' error 1');
							});
						} else {
							console.log('Notationscraping finished for: ' + req.params.index);
						}
					}
					if(stocksInIndex && stocksInIndex.length > 0)
						getNotations(0);
	            });
	        });

	router.route('/editStock/:stock_id')
		//edit a Stock
		.put(function(req, res) {
			Stock.findById(req.params.stock_id, function(err, stock) {
               if (err)
                   res.send(err);
    			// update the stock info
			   stock.kpiurl = req.body.kpiurl;
			   stock.ratesurl = req.body.ratesurl;

               // save the stock
               stock.save(function(err) {
                   if (err)
                       res.send(err);
                   res.json({ message: 'Stock updated!' });
               });
           });
		});

	router.route('/scrapHistoricRates/:index/:timeAmount/:timeUnit')
		.post(function(req, res, next) {
			//console.log('index: ' + req.params.index + '|| timeAmount: ' + req.params.timeAmount + '|| timeUnit: ' + req.params.timeUnit);
			var timeAmount = req.params.timeAmount;
			var timeUnit = req.params.timeUnit;

			Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {
				console.log('index: ' + req.params.index + '|| timeAmount: ' + timeAmount + '|| timeUnit: ' + timeUnit);
				// Stock.find(function(err, stocks) {
				if (err)
					res.send(err  + ' error 2');
				function getRates(index){
					var stock = stocksInIndex[index];
					if(index < stocksInIndex.length) {
						console.log('index: ' + index + '/ ' + stocksInIndex.length);

                        var timePeriod;
                        if (timeUnit == "D") {
                            timePeriod = "days";
                        } else if (timeUnit == "W") {
                            timePeriod = "weeks";
                        } else if (timeUnit == "M") {
                            timePeriod = "months";
                        } else {
                            timePeriod = "years";
                        }

                        console.log('timePeriod: ' + timePeriod);
                        var startDate = moment().locale('de');
                        startDate = startDate.subtract(3, timePeriod).format("DD.MM.YYYY");
                        console.log('calcBackDate: ' + startDate);

						var constructedUrl = "http://www.onvista.de/onvista/times+sales/popup/historische-kurse/?notationId=" +
												stock.notation +
												'&dateStart=' +
												startDate +
												'&interval=' +
												timeUnit+timeAmount +
												'&assetName=huhu' +
												'exchange=Xetra';
						ScrapHistoric(constructedUrl).then(function(result){
                            //stock.rates = [];
							stock.rates = _.unionBy(stock.rates, result, 'date');

                            try {
                                stock.save(function (err) {
                                    if (err) return handleError(err);
                                        //res.send(err);
                                    if(index < stocksInIndex.length)
                                        getRates(++index);
                                    if(index == stocksInIndex.length)
                                        res.send('scraper finished');
                                        console.log('scraper finished for: ' + stock.name);
                                });
                            } catch (e) {
                                console.log(e);
                            }
						}, function(error){
							console.error(error + ' outererror');
						});
					}
				}
				if(stocksInIndex && stocksInIndex.length > 0)
					getRates(0);
			});
		});

	router.route('/scrapRates/:index')
		//scrap the historic rates of the stock
		.post(function(req, res, next) {
			console.log('scrapRates for: ' + req.params.index);

			//Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {
			Stock.find({ 'name': 'continental' },   {} , function (err, stocksInIndex) {

			// Stock.find(function(err, stocks) {
				if (err)
					res.send(err  + ' error 2');
				function getRates(index){
					var stock = stocksInIndex[index];
					if(index < stocksInIndex.length) {
						console.log('getRates for: ' + stock.ratesurl);
						console.log('index: ' + index + '/ ' + stocksInIndex.length);
						ScrapHistoric(stock.ratesurl).then(function(result){
							console.log("scrap: " , result);
							console.log("db: " , stock.rates);
							stock.rates = _.unionBy(stock.rates, result, 'date');
							//console.log("cleaned: " + cleanedRates);
							//stock.rates.concat(cleanedRates); // checken ob datum schon vorhanden _.find(stock.rates, {date: date})
							stock.save(function (err) {
								if (err) return handleError(err);
									//res.send(err);
								if(index < stocksInIndex.length)
									getRates(++index);
								if(index == stocksInIndex.length)
									res.send('scraper finished');
									console.log('scraper finished for: ' + stock.name);
							});
						}, function(error){
							console.error(error + ' outererror');
						});
					}
				}
				if(stocksInIndex && stocksInIndex.length > 0)
					getRates(0);
				});
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
