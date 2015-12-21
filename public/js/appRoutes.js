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
			activetab: 'stocks'
		})

		.when('/watchlists', {
			templateUrl: 'views/watchlists.html',
			controller: 'WatchlistsController',
			activetab: 'watchlists'
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