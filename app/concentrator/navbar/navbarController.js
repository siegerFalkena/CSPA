angular.module('concentrator.concentrator.navbar', [
        'ngAnimate',
        'ui.bootstrap',
        'concentrator.component.searchFilter',
        'concentrator.component.navbar',
        'concentrator.shared.localization'
    ])
    .controller('navbarCtrl', ['$scope', '$rootScope', '$log', 'l10n', navbarCtrl]);



function navbarCtrl(scope, $rootScope, $log, l10n) {
    scope.locale = {};
    scope.languages = l10n.getL10nDirectiveConfig();
    scope.languages.onChange = function(language){
        l10n.curLang = language;
        scope.locale = l10n.getLocale().then(cb_locale_success, cb_locale_fail);
    }
    $log.info(scope.languages)

    function cb_locale_success(res) {
        // $log.info(angular.fromJson(res.data));
        scope.locale = angular.fromJson(res.data);
    };

    function cb_locale_fail(res) {
        $log.error('getLocaleF: ' + res.status);
    };
    l10n.getLocale().then(cb_locale_success, cb_locale_fail);

    scope.$watch('locale', function(newVal, oldVal) {
            $log.info(newVal);
            setItems(scope);
            setAdmin(scope)
        },
        function(newVal, oldVal) {
            return newVal === oldVal;
        });


    function setItems(scope) {
        scope.items = [{
            name: scope.locale['product'],
            url: '#/product'
        }, {
            name: scope.locale['vendor'],
            url: '#/vendor'
        }, {
            name: scope.locale['category'],
            url: '#/category'
        }, {
            name: scope.locale['order'],
            url: '#/order'
        }];
    };


    function setAdmin(scope) {
        scope.admin = {
            title: scope.locale['admin'],
            links: [{
                name: scope.locale['user'],
                url: '#/users'
            }, {
                name: scope.locale['logout'],
                url: '#/logout'
            }]
        };
    };

    function setNavAction(scope){
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
            name: scope.locale['product']
        }, {
            name: scope.locale['vendor']
        }, {
            name: scope.locale['attribute']
        }, {
            name: scope.locale['category']
        }, {
            name: scope.locale['any']
        }]
    };
    };

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


    
};
