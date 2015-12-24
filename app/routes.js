var express			= require('express');
var router 			= express.Router();    // get an instance of the express Router
var Bear     		= require('./models/bear');
var Stock     		= require('./models/stock');
var ScrapKpis    	= require('./scraper/scrapKpis');
var Scraper     	= require('./scraper/test');

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

	// on routes that end in /bears
	// ----------------------------------------------------
	router.route('/addStock')

		// create a stock (accessed at POST http://localhost:8080/api/addStock)
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

    router.route('/scrapKpis')
         //scrap all the stocks
        .post(function(req, res, next) {

            console.log('scrapKpis...');

            Stock.find(function(err, stocks) {
                if (err)
                    res.send(err);

                for(var i= 0; i < stocks.length; i++) {
                    //console.log(stocks[i].kpiurl);
                    //console.log(stocks[i]._id);

                    //stocks[i].kpiScraps.ekr = i + '3';

					stocks[i].kpiScraps.push({ekr: 22, ekq: 98});
                    stocks[i].save(function (err) {
                        if (err) return handleError(err);
                        res.send(stocks[i]);
                    });

                    ScrapKpis(stocks[i].kpiurl, function(result){
                        //console.log('result: ' + result.kpis.ekq);


                    });
                }
            });



            ScrapKpis();

            res.json({ server: 'scrapKpis...' });


            next(); // pass control to the next handler


        });

	router.route('/find_name')
	// create a stock (accessed at POST http://localhost:8080/api/addStock)
		.get(function(req, res) {


			Stock.findOne({ 'name': 'Siemens' },   {} , function (err, lastKpiScrap) {
				if (err) return handleError(err);

				var length = lastKpiScrap.kpiScraps.length;

				//der letzte kpiScrap der Aktie
				console.log(lastKpiScrap.kpiScraps[length-1]);
				res.json(lastKpiScrap.kpiScraps[length-1]);

				// ekr im  letzten kpiScrap der Aktie
				//console.log(lastKpiScrap.kpiScraps[length-1].ekr);
				//res.json(lastKpiScrap.kpiScraps[length-1].ekr);
			})
		});

	// hol alle stocks die im X-index sind (accessed at GET http://localhost:8080/api//findbyindex/dax)
	router.route('/findbyindex/:index')
		// finde eine Aktie mit indexMembership dax
		.get(function(req, res) {

			Stock.find({ 'indexMembership': req.params.index },   {} , function (err, stocksInIndex) {
				if (err) return handleError(err);

				console.log(stocksInIndex);
				res.json(stocksInIndex);

			})
		});




	// on routes that end in /bears
	// ----------------------------------------------------
		router.route('/bears')

			// create a bear (accessed at POST http://localhost:8080/api/bears)
			.post(function(req, res) {

				var bear = new Bear();      // create a new instance of the Bear model
				bear.name = req.body.name;  // set the bears name (comes from the request)
				bear.hobby = req.body.hobby;
				// save the bear and check for errors
				bear.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Bear created!' });
				});
			})

			// get all the bears (accessed at GET http://localhost:8080/api/bears)
			.get(function(req, res) {
				Bear.find(function(err, bears) {
					if (err)
						res.send(err);

					res.json(bears);
				});
			});

	// on routes that end in /bears/:bear_id
	// ----------------------------------------------------
	router.route('/bears/:bear_id')

		// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
		.get(function(req, res) {
			Bear.findById(req.params.bear_id, function(err, bear) {
				if (err)
					res.send(err);
				res.json(bear);
			});
		})

		// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
		.put(function(req, res) {

			// use our bear model to find the bear we want
			Bear.findById(req.params.bear_id, function(err, bear) {

				if (err)
					res.send(err);

				bear.name = req.body.name;  // update the bears info

				// save the bear
				bear.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Bear updated!' });
				});

			});
		})

		// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
		.delete(function(req, res) {
			Bear.remove({
				_id: req.params.bear_id
			}, function(err, bear) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
	app.use('/api', router);


	//test
	app.post('/scraper', function (req, res, next) {
		console.log('Accessing the secret section ...');
		Scraper(

		);

		res.json({ message: 'Scraper(Server) ausgelöst' });


		next(); // pass control to the next handler
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};