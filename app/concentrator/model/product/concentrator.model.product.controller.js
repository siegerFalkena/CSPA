'use strict';
/**
 * 
 */
angular.module('concentrator.model.product')

.controller('productCtrl', ['$scope','productResources','$log','l10nF',
    productCtrl
]);

function productCtrl($scope,productResources,$log,l10nF) {

    //product resource class
    var Product = productResources.getClass();

    $scope.locale = l10nF.getLocale();
    $scope.resourceList = [];

};
