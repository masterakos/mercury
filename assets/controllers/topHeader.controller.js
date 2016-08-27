angular
  .module('MercuryApp')
  .controller('TopHeaderController', TopHeaderController);
  
TopHeaderController.$inject = ['locals', 'companyInfo', 'localizationService'];

function TopHeaderController(locals, companyInfo, localizationService) {
  var vm = this;
  
  vm.phone = companyInfo.phone;
  vm.email = companyInfo.email;
  
  vm.locals = locals;
  vm.selectedLanguage = {
    name: localizationService.language.name,
    code: localizationService.language.code
  };
  
  vm.changeLanguage = function(language) {
    localizationService.setLanguage(language);
  };
}
