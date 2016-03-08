'use strict';
angular.module('concentrator.component.product', [
    'ui.bootstrap',
    'concentrator.component.list'
])

.controller('productCtrl', ['$scope', products]);

function products(scope) {
    scope.products = {
        title: 'products',
        products:
        [{
            name: 'appel',
            prijs: '9.99'
        }, {
            name: 'peer',
            prijs: '9.99'
        }, {
            name: 'banaan',
            prijs: '9.99'
        }, {
            name: 'granaatappel',
            prijs: '9.99'
        }]
    };
};