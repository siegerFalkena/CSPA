
    angular.module('concentrator.component.navbar', 
    [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter'
    ])
    .controller('navbarCtrl',   ['$scope', navbarCtrl])
    .controller('navSearchCtrl',['$scope', navSearchCtrl])
    .controller('dropdownCtrl', ['$scope', dropdownCtrl]);
   

function navbarCtrl(scope) {
    scope.Brand = {
        name: 'concentrator',
        url: '/',
        imgSrc: 'assets/images/jumbo.png'
    };
    scope.items = [
        {name: 'Products', url: '/product'},
        {name: 'Vendors', url: '/vendor'},
        {name: 'Attributes', url: '/attribute'},
        {name: 'Categories', url: '/category'},
        {name: 'Documentation', url: '/documentation'}
    ];
}

function dropdownCtrl(scope){
    scope.dropdown = {
        title: 'Dropdown',
        links: [{
            name: 'firstElement',
            url: '/url1'
        },
        {
            name: 'secondElement',
            url: '/url2'
        }]
    }
}
function navSearchCtrl(scope){
    scope.searchBox = {
        title: 'category',
        categories: [
            {name: 'url1'},
            {name: 'url2'},
            {name: 'url3'},
            {name: 'url4'},
            {name: 'url5'}
        ]
    }

    scope.onClick = {}
}