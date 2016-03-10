'use strict';
angular.module('concentrator.component.searchFilter')
.directive('searchfilter', navSearchFilter)
.directive('navsearchfilter', navSearchFilter)
;

function filter() {
    return {
        templateUrl: '/components/searchFilter/partials/filter.html'
    }
}

function navSearchFilter(){
    return {
        restrict: 'E',
        scope: {
            searchbox: '='
        },
        templateUrl: '/components/searchFilter/partials/navSearchFilter.html'
    }
}