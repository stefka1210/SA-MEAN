angular.module('ScraperCtrl', []).controller('ScraperController', function($scope, $route, $http) {

	$scope.$route = $route;

// TODO: index übergeben, um jeden index getrennt scrappen zu können
	$scope.scrapStock = function(index){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/scrapKpis/' + index,
			body : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(
			function(response) {
				console.log(response.data.message);
			});
		//.success(function(data) {
		//    if (data.errors) {
		//         Showing errors.
		//        $scope.errorName = data.errors.name;
		//        $scope.errorUserName = data.errors.username;
		//        $scope.errorEmail = data.errors.email;
		//    } else {
		//        $scope.message = data.message;
		//    }
		//});
	};

	// historic Rates Scraping
	$scope.scrapRates = function(index){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/scrapRates/' + index,
			body : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(
			function(response) {
				console.log(response.data.message);
			});
	};

	$scope.scrapHistoricRates = function(index, timeAmount, timeUnit){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/scrapHistoricRates/' + index + '/' + timeAmount + '/' +  timeUnit,
			body : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(
			function(response) {
				console.log(response.data.message);
			});
	};


	// Notation
	$scope.scrapNotation = function(index){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/scrapNotation/' + index,
			body : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(
			function(response) {
				console.log(response.data.message);
			});
	};

	$scope.getStockNames = function(index){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/getStockNames/' + index,
			body : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(
			function(response) {
				console.log(response.data.message);
			});
	};

});
