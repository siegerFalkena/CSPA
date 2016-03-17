'use strict';
angular.module('concentrator.component.product').directive('productlist',
    productlist);

function productlist() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchaction: '=',
            itemlist: '=',
            messages: '=',
            sortaction: '='
        },
        templateUrl: '/concentrator/product/partials/productList.html'
    }
}
