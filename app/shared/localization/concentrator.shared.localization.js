'use strict';

function localeProvider(localeString) {
    return this;
}

angular.module('concentrator.shared.localization', ['concentrator.service.controllerUtils'])
    .provider('l10n', [function() {
        var localeFile = '';
        this.supportedLanguages = [
            'en-ie',
            'nl-nl'
        ];
        this.$get = function($http, $locale, $log, $rootScope) {

            //set DEFAULT LOCALE en-ie; Ireland > eng + € + dd/mm/yyyy
            $locale.id = 'en-ie'

            function cb_success(response) {
                $log.info('got languageFile: \t' + response.statusText + '\t' + response.status + '\t' + response.data);
                localeFile = response.data;
                console.log(response.data);
                $rootScope.localeFile = response.data;

            };

            function cb_fail(response) {
                $log.info('failed to get languageFile: ' + response.statusText + response.data);
            };

            var p_langFile = $http.get('/lang/' + $locale.id + '.js').then(cb_success, cb_fail);
        }
    }])
    .service('l10n', ['$locale', '$log', '$rootScope', localization_service]);

function localization_service($locale, $log, $rootScope) {
    this.defaultLocale = 'en-ie';
    this.onLanguageChanged = function(locale) {

    }

    this.getLocaleFile = function() {
        return $rootScope.localeFile;
    }

}

function localization_directive() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            searchcategories: '='
        }
    }
}