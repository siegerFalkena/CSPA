'use strict';
angular.module('concentrator', [
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.collapse',
        'ui.bootstrap.buttons',
        'concentrator.concentrator.navbar',
        'concentrator.component.product',
        'concentrator.shared.localization',
        'concentrator.auth',
        'ngCookies'
    ]).config(['$cookiesProvider', '$httpProvider', function($cookiesProvider, $httpProvider) {}])
    .run(runInit)
    .controller('coreCtrl', ['$scope', 'auth', coreCtrl])
    .directive('loginscreen', loginscreen);

function coreCtrl($scope, auth) {
    if (auth.isAuthed()) {
        $scope.loginscreen = false
    } else {
        $scope.loginscreen = true
    }
}

function loginscreen() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/shared/auth/loginScreen.html'
    }
}

function runInit($locale, $cookies, $log, l10n, auth) {

}
