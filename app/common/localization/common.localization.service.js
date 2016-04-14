angular.module('common.localization')
    .factory('l10nF', ['$locale', '$http', '$log', '$cookies', '$rootScope', l10nFact]);

function l10nFact($locale, $http, $log, $cookies, $rootScope) {
    var l10nService = {};
    l10nService.supportedLanguages = [
        { name: 'nl', id: 'nl', flag: 'src', file: '/LANG/nl-nl.json' },
        { name: 'gb', id: 'gb', flag: 'src', file: '/LANG/en-gb.json' }
    ];
    l10nService.currentLang = l10nService.supportedLanguages[1];
    l10nService.localefile = undefined;

    l10nService.getLocale = function getLocale() {
        return l10nService.localefile;
    }

    /**
     * initializes a JSON locale object in scope. locale object contains identifier <locale> and bindings <english, translated> for translations
     * Also persists language in the scope
     *
     * @method     init
     * @param      {$scope}    scope              scope object to create locale object in
     * @param      {Function}  onChangeFunctions  callback function without arguments for retranslating controller generated text 
     * @param      {Object}  [specificLanguage] languageObject akin to supportedLanguage format 
     */
    l10nService.init = function init(specificLang) {
        var cookieLang = $cookies.get('locale')
        if (cookieLang !== undefined) {
            l10nService.currentLang = angular.fromJson(cookieLang)
        } else {
            l10nService.currentLang = l10nService.supportedLanguages[1]
        };
        if (specificLang !== undefined) {
            l10nService.currentLang = specificLang;
        };

        function cb_success(res) {
            var data = res.data;
            l10nService.localefile = data;
            $cookies.put('locale', angular.toJson(l10nService.currentLang));
        };

        function cb_failure(res) {
            $log.info('failed getting localization file: ' + res.status + "\t" + res.statusText);
        };
        $http.get(l10nService.currentLang.file, {}).then(cb_success, cb_failure);
    };

    return {
        getLocale: function() {
            return l10nService.getLocale()
        },

        init: function(langMetaObject) {
            return l10nService.init(langMetaObject)
        },
        currentLocale: function() {
            return l10nService.currentLang
        },

        supportedLanguages: function() {
            return l10nService.supportedLanguages
        },

        localeFile: l10nService.localefile

    };
};
