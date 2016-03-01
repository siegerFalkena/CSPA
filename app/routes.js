'use strict';
angular.module('concentrator', [
    'ngRoute',
    'ui.router',
    'concentrator.products',
    'concentrator.vendors',
    'concentrator.attributes'
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'home.html',
                    controller: 'homeCtrl'
                })
                .when('/products', {
                    templateUrl: 'products.html',
                    controller: 'productCtrl'
                })
                .when('/vendors', {
                    templateUrl: 'vendors.html',
                    controller: 'vendorCtrl'
                })
                .when('/channels', {
                    templateUrl: 'vendors.html',
                    controller: 'vendorCtrl'
                })
                .otherwise({
                    templateUrl: '404.html'
                });

        }
    ]);