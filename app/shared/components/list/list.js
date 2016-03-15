'use strict';
angular.module('concentrator.component.list', [
        'ui.bootstrap',
        'concentrator.component.product'
    ])

.directive('list', list);

function list() {
    return {
        restrict: 'E',
        scope: {
            attributes: '=',
            items: '='
        },
        templateUrl: '/shared/components/list/list.html'
    };
};
