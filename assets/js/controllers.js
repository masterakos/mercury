angular
  .module('MercuryApp')
  .controller('AppController', AppController);
  
AppController.$inject = ['$i18n', 'AccountService', '$http'];

function AppController($i18n, AccountService, $http) {
  var vm = this;
  
  vm.i18n = $i18n;
  vm.user = AccountService.user;
  vm.logout = function() {
    $http.post('logout').success(function() {
      AccountService.update();
    });
  };
}

angular
  .module('MercuryApp')
  .controller('LoginController', LoginController);
  
LoginController.$inject = ['$http', 'AccountService'];

function LoginController($http, AccountService) {
  var vm = this;
  
  vm.loading = false;
  vm.email = '';
  vm.password = '';
  vm.submit = function() {
    vm.loading = true;
    $http({
      method: 'POST',
      url: 'login',
      params: {
        email: vm.email,
        password: vm.password
      }
    }).then(function(response) {
      AccountService.update();
    }, function(response) {
      console.log(response)
    }).finally(function() {
      vm.loading = false;
    })
  };
  
  vm.recoverPasswordDialog = function(e) {
    e.preventDefault();
    // TODO
  }
}

angular
  .module('MercuryApp')
  .controller('TopHeaderController', TopHeaderController);
  
TopHeaderController.$inject = ['locals', 'companyInfo', 'LocalizationService', 'currencies', 'AccountService'];

function TopHeaderController(locals, companyInfo, LocalizationService, currencies, AccountService) {
  var vm = this;
  
  vm.phone = companyInfo.phone;
  vm.email = companyInfo.email;
  vm.locals = locals;
  vm.selectedLanguage = LocalizationService.language;
  vm.currencies = currencies;
  vm.selectedCurrency = LocalizationService.currency;
  vm.loggedIn = AccountService.loggedIn;
  
  vm.changeLanguage = function(language) {
    LocalizationService.setLanguage(language);
  };
  
  vm.changeCurrency = function(currency) {
    LocalizationService.setCurrency(currency);
  };
}
