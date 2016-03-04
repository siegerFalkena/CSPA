'use strict';
angular.module('concentrator.routes', [
    'ui.router',
    'concentrator.products',
    'concentrator.vendors',
    'concentrator.attributes'
]).config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/vendors",
      templateUrl: "vendor/state1.html"
    })
    .state('state1.list', {
      url: "/vendors",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/products",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/products",
        templateUrl: "products/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      })
    });