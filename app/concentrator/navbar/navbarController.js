angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar',
        'concentrator.shared.localization',
        'concentrator.auth'
    ])
    .controller('navbarCtrl', ['$scope', '$log', 'l10n', 'auth', navbarCtrl]);



function navbarCtrl($scope, $log, l10n, auth) {

    $scope.brand = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/img/circle_gradient.png'
    };

    $scope.diract = {
        name: 'Concentrator',
        url: '/',
        imgSrc: 'assets/img/diract_logo.png'
    };

    function onChangeFunctions() {
        
    };

    $scope.logout = function logout() {
        auth.logout();
    };
    $scope.supportedLanguages = l10n.supportedLanguages;
    l10n.init($scope, onChangeFunctions);
};
