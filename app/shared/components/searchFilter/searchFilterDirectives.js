'use strict';
angular.module('concentrator.component.searchFilter')
.directive('searchfilter', navSearchFilter)
.directive('navsearchfilter', navSearchFilter)
.directive('categorySelector', categorySelector)
;

function filter() {
    return {
        restrict : 'E',
        transclude: true,
        scope: {
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/shared/components/searchFilter/partials/navSearchFilter.html'
    }
}

function navSearchFilter(){
    return {
        restrict: 'E',
        scope: {
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/shared/components/searchFilter/partials/navSearchFilter.html'
    }
}

function categorySelector(){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchcategories: '='
        },
        templateUrl: '/shared/components/searchFilter/partials/categorySelector.html'
    }
}