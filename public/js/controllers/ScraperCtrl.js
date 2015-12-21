/**
 * Created by stefka1210 on 19.12.15.
 */
angular.module('ScraperCtrl', []).controller('ScraperController', function($scope, $route, $http) {

    $scope.$route = $route;
    $scope.tagline = 'Hier wird in Zukunft der Scraper ausgelöst!';

    $scope.getBears = function(){
        console.log('Die Bären sind los');

        var url = 'http://localhost:8080/api/bears';
        $http.get(url).then(
            function(response) {
                console.log('success',response);

                var bear = response.data[1].name;
                $scope.bears = bear;
            },
            function(data) {
                // Handle error here
            })
    };

    $scope.scrap = function() {
        console.log('Scrap?');

        var url = 'http://localhost:8080/scraper';
        $http.post(url).then(
            function(response) {
                console.log('success, Scraper(Client) ausgelöst', response.data.message)
            },
            function(data) {
                // Handle error here
            })
    }

});