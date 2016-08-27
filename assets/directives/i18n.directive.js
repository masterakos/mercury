angular
  .module('MercuryApp')
  .directive('i18n', ['$rootScope', 'localizationService', '$filter', function($rootScope, localizationService, $filter) {
    return function(scope, element, attrs) {
      function applyLocal() {
        var translation = localizationService.language.translations[attrs.i18n];
        if (attrs.filter) {
          attrs.filter.split(' ').forEach(function(filter) {
            translation = $filter(filter)(translation);
          });
        }
        element.text(translation);  
      }
      
      applyLocal();
      
      $rootScope.$on('localization:change', function() {
        applyLocal();
      });
    }
  }]);
