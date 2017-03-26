var app = angular.module('mojaAplikacija', []);
app.controller('kontrolerOsoba', function($scope) {
    $scope.ime = "Marko";
    $scope.prezime = "Petrović";
    $scope.punoImeIPrezime = function() {
        return $scope.ime + " " + $scope.prezime;
    };
});