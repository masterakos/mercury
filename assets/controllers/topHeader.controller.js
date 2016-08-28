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
