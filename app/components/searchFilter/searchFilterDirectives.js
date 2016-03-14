'use strict';
angular.module('concentrator.component.searchFilter')
.directive('searchfilter', navSearchFilter)
.directive('navsearchfilter', navSearchFilter)
;

function filter() {
    return {
        restrict : 'E',
        transclude: true,
        scope: {
            searchbox: '=',
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/components/searchFilter/partials/navSearchFilter.html'
    }
}

function navSearchFilter(){
    return {
        restrict: 'E',
        scope: {
            searchbox: '=',
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/components/searchFilter/partials/navSearchFilter.html'
    }
}