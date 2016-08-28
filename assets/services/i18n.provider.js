angular
  .module('MercuryApp')
  .provider('$i18n', i18n);
  
function i18n() {
  this.$get = ['LocalizationService', function(LocalizationService) {
    return function(translation) {
      return LocalizationService.language.translations[translation] || '';
    };
  }];
}
