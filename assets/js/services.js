angular
  .module('MercuryApp')
  .service('localizationService', ['appDefaults', '$rootScope', '$http', function(appDefaults, $rootScope, $http) {
    var service = this;
    
    this.language = {
      name: '',
      code: '',
      translations: null
    };
    
    this.setLanguage = function(languageCode) {
      this.language.code = languageCode;
      $http.get('assets/local.' + this.language.code + '.json', { cache: true }).success(function(data) {
        service.language.name = data.language;
        service.language.translations = data.locals;
        $rootScope.$emit('localization:change');
      });
    };
    
  }]);
