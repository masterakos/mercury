angular
  .module('MercuryApp')
  .controller('TopHeaderController', TopHeaderController);
  
TopHeaderController.$inject = ['locals', 'companyInfo', 'localizationService'];

function TopHeaderController(locals, companyInfo, localizationService) {
  var vm = this;
  
  vm.phone = companyInfo.phone;
  vm.email = companyInfo.email;
  
  vm.locals = locals;
  vm.selectedLanguage = localizationService.language;
  
  vm.changeLanguage = function(language) {
    localizationService.setLanguage(language);
  };
}
