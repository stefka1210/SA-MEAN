angular.module('StocksService', []).factory('Stocks', ['$http', function($http) {

	return {
        //call to get all stocks of an index, ex. dax, mdax etc., von StocksCtrl via activesubtab
        get : function(index) {
			console.log('selectedIndex:' + index);
            return $http.get('api/findbyindex/'+ index);
        }
    }

}]);
