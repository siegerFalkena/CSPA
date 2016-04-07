'use strict';
/**
 * 
 */
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list',
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

    //table column sorting



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
    scope.messages = [{
        class: "alert alert-success",
        message: "notification",
        close: function() {
            var index = 0;
            for (var message in messages) {
                if (message.class == this && message.message == this.message) {
                    messages.splice(index, 1);
                }
                index = index + 1;
            }
        }
    }]

    //table search/filter

    //only filter on selectedCategories
    //filter on 'any'
    //filter on selected category
    scope.searchaction = filterConfig();

};


function filterConfig() {
    return {
        query: '',
        querycategory: (function() {
            //private
            return {
                //public
            }
        }()),
        search: {},
        filterchange: function(searchaction) {
            this.debug()
            var object = angular.fromJson(searchaction.querycategory);
            searchaction.search = {};
            if (object.name == '*') {
                searchaction.search = searchaction.query;
            } else {
                searchaction.search[object.name] = searchaction.query;
            }
        },
        optionany: true,
        actionLabel: 'Add filter',
        go: function(searchaction) {
            searchaction.debug();
        },
        searchmetacategories: [{
            name: '*',
            shown: true
        }],
        searchcategories: [{
            name: 'ID',
            shown: true
        }, {
            name: 'name',
            shown: true
        }, {
            name: 'price',
            shown: true
        }],
        debug: function() {
            console.log(this);
        },
        sortType: 'ID',
        sortReverse: false

    };
}