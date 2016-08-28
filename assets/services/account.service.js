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
