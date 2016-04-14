angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar',
        'common.localization',
        'common.auth'
    ])
    .controller('navbarCtrl', ['$scope', '$log', 'l10nF', 'auth', navbarCtrl]);



function navbarCtrl($scope, $log, l10nF, auth) {

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

    $scope.l10nF = l10nF;
    $scope.locale = l10nF.getLocale();    
    $scope.auth = auth;

};
