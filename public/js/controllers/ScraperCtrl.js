angular.module('ScraperCtrl', []).controller('ScraperController', function($scope, $route, $http) {

	$scope.$route = $route;

// TODO: index übergeben, um jeden index getrennt scrappen zu können
	$scope.scrapStock = function(){
		$http({
			method: 'Post',
			url: 'http://localhost:8082/api/scrapKpis',
			body : {'Content-Type': 'application/x-www-form-urlencoded'}
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

});
