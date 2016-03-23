angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar',
        'concentrator.shared.localization'
    ])
    .controller('navbarCtrl', ['$scope', 'l10n', navbarCtrl]);

function navbarCtrl(scope, l10n) {
    scope.brand = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/images/circle_gradient.png'
    };

    scope.diract = {
        name: 'Concentrator',
        url: '/',
        imgSrc: 'assets/images/diract_logo.png'
    };

    scope.items = [{
        name: 'Products',
        url: '#/product'
    }, {
        name: 'Vendors',
        url: '#/vendor'
    }, {
        name: 'Categories',
        url: '#/category'
    }, {
        name: 'Orders',
        url: '#/order'
    }];

    scope.admin = {
        title: 'Admin',
        links: [{
            name: 'users',
            url: '#/users'
        }, {
            name: 'logout',
            url: '#/logout'
        }]
    };

    scope.languages = '';


    scope.languageTitle = 'languages';
    scope.navaction = {
        query: '',
        search: {
            Product: '',
            Vendor: '',
            Category: '',
            Attribute: ''
        },
        actionLabel: 'Search',
        go: function() {

        },
        searchcategories: [{
            name: 'Product'
        }, {
            name: 'Vendor'
        }, {
            name: 'Attribute'
        }, {
            name: 'Category'
        }, {
            name: 'any'
        }]
    };
};
