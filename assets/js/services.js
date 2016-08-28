angular
  .module('MercuryApp')
  .service('AccountService', ['$http', function($http) {
    this.user = {
      loggedIn: false,
      details: {}
    };
    
    this.update = function(callback) {
      $http.get('me').success(function(data) {
        this.user.loggedIn = true;
        this.user.details = JSON.parse(data);
      }.bind(this))
      .error(function(response) {
        this.user.loggedIn = false;
        this.user.details = {};
      }.bind(this));
    };
  }]);

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

angular
  .module('MercuryApp')
  .service('LocalizationService', ['appDefaults', '$rootScope', '$http', 'currencies', function(appDefaults, $rootScope, $http, currencies) {
    var service = this;
    
    this.language = {
      name: '',
      code: '',
      translations: null
    };
    
    this.currency = {
      name: '',
      code: '',
      symbol: ''
    };
    
    this.setLanguage = function(languageCode) {
      this.language.code = languageCode;
      $http.get('assets/local.' + this.language.code + '.json', { cache: true }).success(function(data) {
        service.language.name = data.language;
        service.language.translations = data.locals;
        $rootScope.$emit('localization:change');
        localStorage.setItem('local.language', languageCode);
      });
    };
    
    this.setCurrency = function(currencyCode) {
      var selectedCurrency = currencies.find(function(currency) { return currency.code == currencyCode; });
      this.currency.name = selectedCurrency.name;
      this.currency.code = selectedCurrency.code;
      this.currency.symbol = selectedCurrency.symbol;
      localStorage.setItem('local.currency', currencyCode);
    };
  }]);
