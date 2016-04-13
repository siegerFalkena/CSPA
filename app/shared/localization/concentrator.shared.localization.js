'use strict';
/** Singleton service for localization
 *  @module angular_module.concentrator.l10n
 *  @memberof angular_module
 */
angular.module('concentrator.shared.localization', ['concentrator.service.controllerUtils'])

.service('l10n', ['$locale', '$http', '$log', '$rootScope', l10n]);


/**
 * object constructor
 *
 * @method     l10n
 * @param      $locale     { description }
 * @param      $http       { description }
 * @param      $log        { description }
 * @param      $rootScope  { description }
 */
function l10n($locale, $http, $log, $rootScope) {


    this.supportedLanguages = [
        { name: 'nl', id: 'nl', flag: 'src', file: '/LANG/nl-nl.json' },
        { name: 'gb', id: 'gb', flag: 'src', file: '/LANG/en-gb.json' }
    ];
    this.currentLang = this.supportedLanguages[1];
    this.currentLocale = undefined;
   
    this.changeLocale = changeLocale;
    /**
     * changes the locale and reinitializes scope.
     *
     * @method     changeLocale
     * @param      strLocale  locale as <a href="https://en.wikipedia.org/wiki/ISO_639-1">ISO-639-1</a>
     */
    function changeLocale(supportedLanguage) {
        $log.info('pops');
        this.currentLang = supportedLanguage;
        this.init();
    };


    this.init = init;
    /**
     * initializes a JSON locale object in scope. locale object contains identifier <locale> and bindings <english, translated> for translations
     *
     * @method     init
     * @param      {$scope}    scope              scope object to create locale object in
     * @param      {Function}  onChangeFunctions  callback function without arguments for retranslating controller generated text 
     * @param      {String}  strLocale   <a href="https://en.wikipedia.org/wiki/ISO_639-1">ISO-639-1</a> string for reinitializing language 
     */
    function init() {
        var l10nSingleton = this;
        function cb_success(res) {
            l10nSingleton.currentLocale = res.data;
        };

        function cb_failure(res) {
            $log.info('failed getting localization file: ' + res.status + "\t" + res.statusText);
        };
        $http.get(this.currentLang.file, {}).then(cb_success, cb_failure);
    };

};
