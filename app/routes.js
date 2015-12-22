var express			= require('express');
var router 			= express.Router();    // get an instance of the express Router
var Bear     		= require('./models/bear');
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