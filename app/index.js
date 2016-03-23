'use strict';
angular.module('concentrator', [
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.collapse',
        'ui.bootstrap.buttons',
        'concentrator.concentrator.navbar',
        'concentrator.component.product',
        'concentrator.shared.localization',
        'concentrator.auth',
        'ngCookies'
    ]).config(['$cookiesProvider', '$httpProvider', function($cookiesProvider, $httpProvider) {
        $cookiesProvider.defaults['secure'] = true;
        $cookiesProvider.defaults['domain'] = 'localhost';
        $httpProvider.defaults.headers.common = {'authentication': 'username:password'};
    }])
    .run(function($locale, $cookies, $log, l10n, auth) {
        //init locale
        var localeCookie = $cookies.get('locale');
        if (localeCookie == undefined) {
            $cookies.put('locale', l10n.defaultLocale);
            $locale.id = l10n.defaultLocale
            $log.info('cookie defaultLocale:' + l10n.defaultLocale);
        } else {
            $locale.id = localeCookie;
        };
        auth.doAuth("username", "password");

        //init authCookie
        if ($cookies.get('auth') == undefined) {
                $log.info('incomplete session info; resetting');
                $cookies.put('authKey', {});
        } else {
            $log.info('try reauth by cookie: ');
        };


    })