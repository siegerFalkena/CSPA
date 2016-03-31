'use strict';

angular.module('concentrator.shared.localization', ['concentrator.service.controllerUtils'])

.service('l10n', ['$locale', '$http', '$log', '$rootScope', l10n]);

function l10n($locale, $http, $log, $rootScope) {


    this.supportedLanguages = [
        { name: 'nl', id: 'nl-nl', flag: 'src', file: '/LANG/nl-nl.js' },
        { name: 'ie', id: 'gb-ie', flag: 'src', file: '/LANG/en-ie.js' }
    ];

    this.currentLang = this.supportedLanguages[1];

    this.getL10nDirectiveConfig = function() {
        return {
            languages: this.supportedLanguages,
            onChange: function(newLang) {
                this.currentLang = newLang;
            }
        };
    };


    this.init = function(scope, onChangeFunctions) {
        scope.$watch('locale', function(newVal, oldVal) {
            if (newVal != undefined) {
                onChangeFunctions();
            } else {
                $log.info('locale was changed, but the new value was undefined');
            }
        });

        function cb_success(res) {
            scope.locale = res.data;
            $log.info(scope.locale);
        };

        function cb_failure(res) {
            $log.info('failed getting localization file: ' + res.status + "\t" + res.statusText);
        };
        $http.get(this.currentLang.file, {}).then(cb_success, cb_failure);
    };

};

function localization_directive() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            searchcategories: '='
        }
    }
}
