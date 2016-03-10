'use strict';
angular.module('concentrator.component.product')
.directive('tablerows', productTableRow)
.directive('tableheader', productTableHeader);

function productTableRow() {
    return {
        restrict: 'E',
        scope: {
            itemlist: '='
        },
        templateUrl: '/components/concentrator/product/partials/productTableRow.html'
    };
};
function productTableHeader() {
    return {
        restrict: 'E',
        scope: {
            attributelist: '='
        },
        templateUrl: '/components/concentrator/product/partials/productTableHeader.html'
    };
};