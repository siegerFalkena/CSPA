'use strict';
angular.module('concentrator.component.list', ['ui.bootstrap', 'concentrator.component.product'])
.directive('list', list)
.directive('data', data)
.directive('headerdata', headerdata)
;
function list() {
    return {
        restrict: 'E',
        scope: {
            attributes: '=',
            items: '='
        },
        templateUrl: '/components/list/list.html'
    };
};
function data() {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        templateUrl: '/components/list/partials/tableData.html'
    };
};
function headerdata() {
    return {
        restrict: 'E',
        scope: {
            attribute: '='
        },
        templateUrl: '/components/list/partials/tableHeaderData.html'
    };
};