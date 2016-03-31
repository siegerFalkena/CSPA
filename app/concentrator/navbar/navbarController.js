angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar',
        'concentrator.shared.localization'
    ])
    .controller('navbarCtrl', ['$scope', '$log', 'l10n', navbarCtrl]);



function navbarCtrl($scope, $log, l10n) {

    function setItems() {
        $scope.items = [{
            name: $scope.locale['product'],
            url: '#/product'
        }, {
            name: $scope.locale['vendor'],
            url: '#/vendor'
        }, {
            name: $scope.locale['category'],
            url: '#/category'
        }, {
            name: $scope.locale['order'],
            url: '#/order'
        }];
    };


    function setAdmin() {
        $scope.admin = {
            title: $scope.locale['admin'],
            links: [{
                name: $scope.locale['user'],
                url: '#/users'
            }, {
                name: $scope.locale['logout'],
                url: '#/logout'
            }]
        };
    };

    function setNavAction() {
        $scope.navaction = {
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
                name: $scope.locale['product'],
                category: 'product'
            }, {
                name: $scope.locale['vendor'],
                category: 'vendor'
            }, {
                name: $scope.locale['attribute'],
                category: 'attribute'
            }, {
                name: $scope.locale['category'],
                category: 'category'
            }, {
                name: $scope.locale['any'],
                category: 'any'
            }]
        };
    };

    $scope.brand = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/images/circle_gradient.png'
    };

    $scope.diract = {
        name: 'Concentrator',
        url: '/',
        imgSrc: 'assets/images/diract_logo.png'
    };

    function onChangeFunctions() {
        setItems();
        setAdmin();
        setNavAction();
    };

    l10n.init($scope, onChangeFunctions);
};
