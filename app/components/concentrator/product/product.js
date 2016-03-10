'use strict';
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list',
    'concentrator.services.rest'
])

.controller('productCtrl', ['$scope', 'productRestDAO', '$log', products]);

function products(scope, productRestDAO, $log) {
    scope.actions = [{
        label: 'actionExample',
        doit: function() {
            console.log(action)
        }
    }];

    var p_itemlist = productRestDAO.list();
    p_itemlist.then(function(itemlist) {
        var newlist = angular.fromJson(itemlist, false);
        scope.itemlist = newlist.itemslist;
    }, function(reason) {
        alert('Failed: ' + reason);
    }, function(update) {
        alert('Got notification: ' + update);
    });

    //table sorting
    scope.sortType = 'ID';
    scope.sortReverse = false;
    //table labels
    scope.searchbox = {
        actionLabel: 'filter',
        categories: [{
            name: 'date'
        }, {
            name: 'price'
        }, {
            name: 'ID'
        }, {
            name: 'date'
        }]
    };
};