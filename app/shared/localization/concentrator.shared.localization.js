'use strict';

angular.module('concentrator.shared.localization', ['concentrator.service.controllerUtils'])

.service('l10n', ['$locale', '$http', '$log', '$rootScope', l10n]);

function l10n($locale, $http, $log, $rootScope) {
    this.supportedLanguages = [
        { name: 'nl', id: 'nl-nl', flag: 'src', file: '/LANG/nl-nl.js' },
        { name: 'ie', id: 'nl-nl', flag: 'src', file: '/LANG/en-ie.js' }
    ]

    this.curLang = this.supportedLanguages[1];
    $rootScope.$watch(function(){
        return this.curLang;
    },
    function(newVal, oldVal){
        this.getLocaleF
    })
    this.getLocale = function getLocaleF() {
        return $http.get(this.curLang.file);
    };

    this.getL10nDirectiveConfig= function(){
        return {
            languages: this.supportedLanguages,
            onChange: function(newLang){
                this.curLang = newLang;
            }
        }
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
