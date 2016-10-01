angular.module('StocksCtrl', []).controller('StocksController', function($scope, $route, Stocks) {

	$scope.$route = $route;

	$scope.sortType     = '-kpiScraps[0].sumPoints'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order

	//get the selected index
	var index = $route.current.activesubtab;

	Stocks.get(index)
		.success(function(data) {
			$scope.stocks = data;
		});
});
