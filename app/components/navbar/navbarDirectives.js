angular.module('concentrator.component.navbar')
    .directive('dropdown', navbarDropdown)
    .directive('brand', brand)
    .directive('navbar', navbar);

function navbarDropdown() {
    return {
        restrict: 'E',
        scope: {
            dropdown: '='
        },
        templateUrl: '/components/navbar/partials/navDropdown.html'
    };
};

function brand() {
    return {
        restrict: 'E',
        scope: {
            brand: '='
        },
        templateUrl: '/components/navbar/partials/navBrand.html'
    };
};

function navbar() {
    return {
        templateUrl: '/components/navbar/partials/navbar.html'
    };
};