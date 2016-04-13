'use strict';
/**
 * 
 */
angular.module('concentrator.model.product')

.controller('productCtrl', [
    '$scope',
    'productResources',
    '$log',
    'l10n',
    productCtrl
]);

function productCtrl(
    $scope,
    productResources,
    $log,
    controllerCommons,
    l10n) {


    //product resource class
    var Product = productResources.getClass();
    $scope.l10n = l10n;
    $scope.$watch('l10n', function(newVal, oldVal, bool) {
        if (newVal != undefined) {
            $scope.locale = newVal.localefile;
        }
    });

    $scope.resourceList = [];

};
