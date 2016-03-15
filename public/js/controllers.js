'use strict'

var validationApp = angular.module("validationApp", ['ui.router'])

validationApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Define states
    .state('homeView', {
      url: "/",
      template: "<h4>Welcome to Whatever it is... bla bla bla</h4><br><br>"
    })
    .state('registrationView', {
      url: "/registration",
      controller: 'validationController',
      templateUrl: '/htmlPartials/registrationView.html' // host/#/about
    })

    $urlRouterProvider.otherwise('/') // Default URL
})
validationApp.controller("countryController", function($scope, CountryService) {
  $scope.countries = CountryService.getCountries()
})

validationApp.controller("validationController", function($scope) {

  $scope.submitRegistrationForm =  function(invalid) {

  }

  $scope.cardChange = function() {

    if (!checkLuhn($scope.user.creditcard)) {
      $scope.registrationForm.$error.luhn = true;
      $scope.registrationForm.creditcard.$error.luhn = true;
    } else {
      delete $scope.registrationForm.$error.luhn; // Allow or dissallow submitting form
      delete $scope.registrationForm.creditcard.$error.luhn; // Existance = for show/hide the error
    }
  }
})

function checkLuhn(digits) {
  var localDigits = digits.toString().split('')
  var checkSum = localDigits.splice(localDigits.length-1)*1
  var i = localDigits.length - 1
  var check = true
  var localChar
  var runningTotal = 0
  while (i >= 0) {
    if (check) {
      localChar = localDigits[i]
      localChar *=2
      if (localChar > 9) {
        localChar -= 9
      }
      runningTotal += localChar
    } else {
      runningTotal += localDigits[i]*1
    }
    check = !check
    i--
  }
  var checkDigit = (runningTotal*9)%10

  return checkDigit === checkSum
}
