angular.module('concentrator.component.navbar')
    .directive('dropdown', navbarDropdown)
    .directive('brand', brand)
    .directive('navbar', navbar)
    ;

function navbarDropdown() {
    return {
        templateUrl: '/components/navbar/partials/navDropdown.html'
    };
}
function brand() {
    return {
        templateUrl: '/components/navbar/partials/navBrand.html'
    }
}
function navbar() {
    return {
        templateUrl: '/components/navbar/partials/navbar.html'
    }
}
