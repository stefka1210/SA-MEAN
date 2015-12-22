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

    //$scope.bearName = {};

    $scope.postBear = function(){
        console.log('add a bear');

        //var url = 'http://localhost:8080/api/bears';
        //var data = {name: $scope.bearName };

        $http({
            method: 'Post',
            url: 'http://localhost:8080/api/bears',
            data: {
                name: $scope.bearName,
                hobby: $scope.bearHobby
            },
            body : {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(data) {
                if (data.errors) {
                    // Showing errors.
                    //$scope.errorName = data.errors.name;
                    //$scope.errorUserName = data.errors.username;
                    //$scope.errorEmail = data.errors.email;
                } else {
                    //$scope.message = data.message;
                }
            });
        //$http.post(url, data).then(
        //    function(response) {
        //        console.log('success',response);
        //
        //    },
        //    function(data) {
        //        // Handle error here
        //    })
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