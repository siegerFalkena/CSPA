angular.module('concentrator.component.navbar')
    .directive('dropdown', navbarDropdown)
    .directive('brand', brand)
    .directive('navbar', navbar)
    .directive('navbarTabs', navbarTabs);

function navbarDropdown() {
    return {
        restrict: 'E',
        scope: {
            dropdown: '='
        },
        templateUrl: '/shared/components/navbar/partials/navDropdown.html'
    };
};

function brand() {
    return {
        restrict: 'E',
        scope: {
            brand: '='
        },
        templateUrl: '/shared/components/navbar/partials/navBrand.html'
    };
};

function navbar() {
    return {
        templateUrl: '/shared/components/navbar/partials/navbar.html'
    };
};

function navbarTabs() {
    return {
        templateUrl: '/shared/components/navbar/partials/navbarTabs.html'
    };
};