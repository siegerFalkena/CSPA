'use strict';
/**
 * 
 */
angular.module('concentrator.model.product')

.controller('productCtrl', [
    '$scope',
    'productResources',
    '$log',
    'controllerCommons',
    products
]);

function products(
    scope,
    productResources,
    $log,
    controllerCommons) {

    //product resource class
    var Product = productResources.getClass();
};

