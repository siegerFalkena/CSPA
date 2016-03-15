angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar'
    ])
    .controller('navbarCtrl', ['$scope', navbarCtrl]);

function navbarCtrl(scope) {
    scope.brand = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/images/jumbo.png'
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
        name: 'Attributes',
        url: '#/attribute'
    }, {
        name: 'Categories',
        url: '#/category'
    }, {
        name: 'Documentation',
        url: '#/documentation'
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
