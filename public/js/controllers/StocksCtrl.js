angular.module('StocksCtrl', []).controller('StocksController', function($scope, $route, Stocks, $http) {

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

	$scope.editStock = function(stock){
		console.log(stock._id);

        $http({
            method: 'Put',
            url: 'http://localhost:8082/api/editStock/' + stock._id,
            data: {
                kpiurl: $scope.opened.kpiurl,
                ratesurl: $scope.opened.ratesurl
            },
            body : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response) {
                console.log(response.data.message)
        });
            //.success(function(data) {
            //    //if (data.errors) {
            //    //    // Showing errors.
            //    //    //$scope.errorName = data.errors.name;
            //    //    //$scope.errorUserName = data.errors.username;
            //    //    //$scope.errorEmail = data.errors.email;
            //    //} else {
            //    //    //$scope.message = data.message;
            //    //}
            //});
    };


});
