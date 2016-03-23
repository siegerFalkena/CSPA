'use strict';
angular.module('concentrator.service.supportedLanguages', [
    'ngLocalize',
    'ngLocalize.InstalledLanguages'
])
.value('localeSupported', [
    'en-GB',
    'fr-FR',
    'nl-NL'
])
.value('localeFallbacks', {
    'en': 'en-GB',
    'fr': 'fr-FR',
    'nl': 'nl-NL'
});