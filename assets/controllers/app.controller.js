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
