'use strict';
angular.module('concentrator.component.selector', ['ui.bootstrap'])
    .directive('selector', selector);

function selector() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchcategories: '='
        },
        templateUrl: '/shared/components/selector/partials/selector.html'
    }
}
