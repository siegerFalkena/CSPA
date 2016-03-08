
    angular.module('concentrator.component.navbar', 
    [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter'
    ])
    .controller('navbarCtrl',   ['$scope', navbarCtrl])
    .controller('navSearchCtrl',['$scope', '$http', navSearchCtrl])
   

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

    scope.items = [
        {name: 'Products', url: '#/product'},
        {name: 'Vendors', url: '#/vendor'},
        {name: 'Attributes', url: '#/attribute'},
        {name: 'Categories', url: '#/category'},
        {name: 'Documentation', url: '#/documentation'}
    ];

    scope.admin = {
        title: 'Admin',
        links: [{
            name: 'users',
            url: '#/users'
        },
        {
            name: 'logout',
            url: '#/logout'
        }]
    };

    scope.searchbox = {
        actionLabel: 'Search',
        categories: [
            {name: 'Products'},
            {name: 'Vendors'},
            {name: 'Categories'},
            {name: 'Attributes'},
            {name: 'Documentation'}
        ],
        submit: function(){
        }
    };
}

function navSearchCtrl(scope, http){
    
}