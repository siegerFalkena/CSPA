'use strict'
angular.module('common.localization')
    .directive('flagSelector', flagSelector);

function flagSelector() {
    return {
        restrict: 'E',
        scope: {
            localeservice: '=',
        },
        templateUrl: '/common/localization/partials/localizationSelector.html'
    }
}
