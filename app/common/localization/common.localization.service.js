angular.module('common.localization').service('l10n', ['$locale', '$http', '$log', '$cookies', '$rootScope', l10n])
.factory('l10nF', ['$locale', '$http', '$log', '$cookies', '$rootScope', l10nFact]);

function l10nFact($locale, $http, $log, $cookies, $rootScope){
    return {

    };
}

/**
 * object constructor
 *
 * @method     l10n
 * @param      $locale     { description }
 * @param      $http       { description }
 * @param      $log        { description }
 * @param      $rootScope  { description }
 */
function l10n($locale, $http, $log, $cookies) {

    this.supportedLanguages = [
        { name: 'nl', id: 'nl', flag: 'src', file: '/LANG/nl-nl.json' },
        { name: 'gb', id: 'gb', flag: 'src', file: '/LANG/en-gb.json' }
    ];
    this.currentLang = this.supportedLanguages[1];
    this.localefile = undefined;

    this.changeLocale = changeLocale;
    /**
     * changes the locale and reinitializes scope.
     *
     * @method     changeLocale
     * @param      strLocale  locale as <a href="https://en.wikipedia.org/wiki/ISO_639-1">ISO-639-1</a>
     */
    function changeLocale(supportedLanguage) {
        this.init(supportedLanguage);
    };


    this.init = init;
    /**
     * initializes a JSON locale object in scope. locale object contains identifier <locale> and bindings <english, translated> for translations
     * Also persists language in the scope
     *
     * @method     init
     * @param      {$scope}    scope              scope object to create locale object in
     * @param      {Function}  onChangeFunctions  callback function without arguments for retranslating controller generated text 
     * @param      {Object}  [specificLanguage] languageObject akin to supportedLanguage format 
     */
    function init(specificLang) {
        var cookieLang = $cookies.get('locale');
        if (cookieLang != undefined) {
            this.currentLang = angular.fromJson(cookieLang);
        } else {
            this.currentLang = this.supportedLanguages[1];
        };
        if (specificLang != undefined) {
            this.currentLang = specificLang;
        };
        var service = this;

        function cb_success(res) {
            var data = res.data;
            this.localefile = data;
            $cookies.put('locale', angular.toJson(service.currentLang));
        };

        function cb_failure(res) {
            $log.info('failed getting localization file: ' + res.status + "\t" + res.statusText);
        };
        $http.get(this.currentLang.file, {}).then(cb_success, cb_failure);
    };

};
