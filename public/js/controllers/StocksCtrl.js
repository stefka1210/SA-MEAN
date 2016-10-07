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

	$scope.open = function(stock){
        if ($scope.isOpen(stock)){
            $scope.opened = undefined;
        } else {
            $scope.opened = stock;
        }
    };

    $scope.isOpen = function(stock){
        return $scope.opened === stock;
    };

    $scope.anyStockOpen = function() {
        return $scope.opened !== undefined;
    };

    $scope.close = function() {
        $scope.opened = undefined;
    };
});
