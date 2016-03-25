angular.module('concentrator.component.navbar')
    .directive('dropdown', navbarDropdown)
    .directive('brand', brand)
    .directive('navbar', navbar)
    .directive('navbarTabs', navbarTabs)
    .directive('localizationDropdown', localizationSelector)
    .service('navbarConfig', config);

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

function localizationSelector() {
    return {
        restrict: 'E',
        scope: {
            languages: '='
        },
        templateUrl: '/shared/components/navbar/partials/languageSelector.html'
    };
};

function config() {

    this.brand = function() {
        return {
            label: 'Jumbo',
            url: '/',
            imgSrc: 'assets/images/jumbo.png'
        }
    };


    this.items = function() {
        return [{
            name: 'name',
            url: '#/url'
        }]
    };

    this.admin = function() {
        return {
            title: 'Admin',
            links: [{
                name: 'users',
                url: '#/users'
            }]
        }
    };
}
