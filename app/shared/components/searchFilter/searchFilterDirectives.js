'use strict';
angular.module('concentrator.component.searchFilter')
    .directive('searchfilter', navSearchFilter)
    .directive('navsearchfilter', navSearchFilter)
    .service('searchFilterConfig', config);

function filter() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/shared/components/searchFilter/partials/navSearchFilter.html'
    }
}

function navSearchFilter() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchcategories: '=',
            searchaction: '='
        },
        templateUrl: '/shared/components/searchFilter/partials/navSearchFilter.html'
    }
}


function config() {
    var filterConfig = function filterConfigF() {
        return {
            query: '',
            search: {
                Product: '',
                Vendor: '',
                Category: '',
                Attribute: ''
            },
            actionLabel: 'Search',
            f_doSearch: function() {

            },
            searchcategories: [{
                name: 'name'
            }]
        }
    };
}
