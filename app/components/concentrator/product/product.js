'use strict';
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list',
    'concentrator.service.resource',
    'concentrator.service.controllerUtils'
])

.controller('productCtrl', ['$scope', 'productResources', '$log', 'controllerCommons', products]);

function products(scope, productResources, $log, controllerCommons) {

    //product resource class
    var Product = productResources.getClass();

    //SIDEBAR
    scope.actions = [{
        label: 'actionExample',
        doit: function() {
            console.log(action)
        }
    }];

    //GET ITEMS
    //TODO: SPINNER TOEVOEGEN
    scope.setItems = function(itemList) {
        scope.itemlist = itemList;
    };

    var p_itemlist = Product.query().$promise;
    scope.itemlist = controllerCommons.resolvePromise(p_itemlist, scope.setItems);


    //table column sorting
    scope.sorttype = 'ID';
    scope.sortreverse = false;


    //table search/filter
    scope.searchaction = {
        selectedcategory: 'id',
        query: '',
        actionLabel: 'filter',
        go: function() {

        },
        searchcategories : [{
            name: 'id'
        }, {
            name: 'name'
        }, {
            name: 'price'
        }, {
            name: 'none'
        }, {
            name: 'description'
        }]
    };




};