'use strict';
angular.module('concentrator.component.searchFilter')
.directive('searchFilter', brand)
.directive('navsearchfilter', navSearchFilter)
;

function filter() {
    return {
        templateUrl: '/components/searchFilter/partials/filter.html'
    }
}

function navSearchFilter(){
    return {
        templateUrl: '/components/searchFilter/partials/navSearchFilter.html'
    }
}