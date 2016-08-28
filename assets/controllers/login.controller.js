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
