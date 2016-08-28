angular
  .module('MercuryApp')
  .directive('i18n', ['$rootScope', 'LocalizationService', '$filter', function($rootScope, LocalizationService, $filter) {
    return function(scope, element, attrs) {
      function applyLocal() {
        var translation = LocalizationService.language.translations[attrs.i18n];
        if (angular.isDefined(translation)) {
          if (attrs.filter) {
            attrs.filter.split(' ').forEach(function(filter) {
              translation = $filter(filter)(translation);
            });
          }
          element.text(translation);  
        }
      }
      
      applyLocal();
      
      $rootScope.$on('localization:change', function() {
        applyLocal();
      });
    }
  }]);
