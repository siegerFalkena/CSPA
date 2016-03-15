'use strict';
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list',
    'concentrator.service.resource',
    'concentrator.service.controllerUtils'
])

.controller('productCtrl', [
    '$scope',
    'productResources',
    '$log',
    'controllerCommons',
    products
]);

function products(scope, productResources, $log, controllerCommons) {

    //product resource class
    var Product = productResources.getClass();

    //SIDEBAR
    scope.actions = {
        label: 'actionExample',
        doit: function() {
            console.log(action)
        }
    };

    //GET ITEMS
    //TODO: SPINNER TOEVOEGEN
    scope.cb_setItems = function(itemList) {
        scope.itemlist = itemList;
    };

    var p_itemlist = Product.query().$promise;
    scope.itemlist =
        controllerCommons.resolvePromise(p_itemlist, scope.cb_setItems);


    //table column sorting
    scope.sorttype = 'ID';
    scope.sortreverse = false;


    //table search/filter

    //only filter on selectedCategories
    //filter on 'any'
    //filter on selected category
    scope.searchaction = {
        query: '',
        querycategory: '',
        filterchange: function() {
            this.search = {};
            this.search[this.querycategory.name] = this.query;
            console.log(this);
        },
        search: {},
        actionLabel: 'Search',
        go: function() {
            scope.itemlist =
                controllerCommons.resolvePromise(p_itemlist, scope.cb_setItems);
        },
        searchcategories: [{
            name: 'ID',
            shown: true
        }, {
            name: 'name',
            shown: true
        }, {
            name: 'price',
            shown: true
        }]

    };




};
