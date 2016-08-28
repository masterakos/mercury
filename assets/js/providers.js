angular
  .module('MercuryApp')
  .provider('$i18n', ['LocalizationService', function(LocalizationService) {
    this.$get = function() {
      return {
        i18n: function(translation) {
          return LocalizationService.translations[translation];
        }
      };
    };
  }]);
