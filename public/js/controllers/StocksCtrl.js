angular.module('StocksCtrl', []).controller('StocksController', function($scope, $route, Stocks) {

	$scope.$route = $route;

	$scope.message = {
   text: 'hello world!',
   time: new Date()
};

	//$recomm = 'hoho';

	//get the selected index
	var index = $route.current.activesubtab;

	Stocks.get(index)
		.success(function(data) {
			//console.log(index + 'huhu');
			$scope.stocks = data;

			//data.kpiScraps[0].sumPoints

		});
});
