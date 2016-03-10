'use strict';
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list'
])

.controller('productCtrl', ['$scope', products]);

function products(scope) {
    scope.actions = [
    {
        label: 'actionExample',
        doit: function(){
            console.log(action)
        }
    }
    ];
    scope.sortType = 'ID';
    scope.sortReverse = false;
    
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
    

    scope.itemlist = [{
        ID: 1,
        name: 'appel',
        price: '9.99'
    }, {
        ID: 2,
        name: 'peer',
        price: '8.99'
    }, {
        ID: 3,
        name: 'banaan',
        price: '7.99'
    }, {
        ID: 4,
        name: 'granaatappel',
        price: '6.99'
    }];
};