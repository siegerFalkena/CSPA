'use strict';
angular.module('concentrator.component.list', ['ui.bootstrap'])
.directive('list', list)
;
function list() {
    return {
        restrict: 'E',
        scope: {
            elementlist: '='
        },
        templateUrl: '/components/list/list.html'
    };
};