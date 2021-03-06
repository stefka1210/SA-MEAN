angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			activetab: 'stocks'
		})

		.when('/stocks', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'all'
		})
		.when('/stocks/dax', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'dax'
		})
		.when('/stocks/mdax', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'mdax'
		})
		.when('/stocks/tecdax', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'tecdax'
		})
		.when('/stocks/sdax', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'sdax'
		})
		.when('/stocks/smallcaps_de', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'smallcaps_de'
		})
		.when('/stocks/euro-stoxx-600', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'euro-stoxx-600'
		})
		.when('/stocks/dowjones', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'dowjones'
		})
		.when('/stocks/nasdaq', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'nasdaq'
		})
		.when('/stocks/sp-500', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'sp-500'
		})
		.when('/stocks/smi', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'smi'
		})
		.when('/stocks/atx', {
			templateUrl: 'views/stocks.html',
			controller: 'StocksController',
			activetab: 'stocks',
			activesubtab: 'atx'
		})
		.when('/watchlists', {
			templateUrl: 'views/watchlists.html',
			controller: 'WatchlistsController',
			activetab: 'watchlists'
		})
		.when('/scraper/addastock', {
			templateUrl: 'views/addastock.html',
			controller: 'AddastockController',
			activetab: 'addastock'
		})

		.when('/scraper', {
			templateUrl: 'views/scraper.html',
			controller: 'ScraperController',
			activetab: 'scraper'
		})

		.when('/calendar', {
			templateUrl: 'views/calendar.html',
			controller: 'CalendarController',
			activetab: 'calendar'
		});
	$locationProvider.html5Mode(true);

}]);
