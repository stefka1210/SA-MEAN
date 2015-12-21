angular.module('MainCtrl', []).controller('MainController', function($scope, $route) {

	$scope.$route = $route;
	$scope.tagline = 'To the moon and back!';	

});