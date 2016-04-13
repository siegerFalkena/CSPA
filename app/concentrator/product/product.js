'use strict';
/**
 * 
 */
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.selector',
    'concentrator.service.resource',
    'concentrator.service.controllerUtils',
    'concentrator.component.messagelist',
    'angular-toArrayFilter',
    'ui.grid'
])

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
    controllerCommons,
    selectorConfig) {

    //product resource class
    var Product = productResources.getClass();

    //GET ITEMS
    //TODO: SPINNER TOEVOEGEN
    scope.cb_setItems = function(itemList) {
        scope.itemlist = itemList;
    };
};

}
