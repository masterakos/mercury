angular
  .module('MercuryApp', [
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'index',
        url: '/',
        views: {
          topHeader: {
            templateUrl: 'assets/templates/top-header.template.html',
            controller: 'TopHeaderController',
            controllerAs: 'header'
          },
          header: {
            templateUrl: 'assets/templates/header.template.html'
          },
          navbar: {
            templateUrl: 'assets/templates/navbar.template.html'
          }
          // slider: {
          //   templateUrl: 'assets/views/slider.template.html'
          // },
          // content: {
          //   template: 'assets/views/index.template.html'
          // },
          // footer: {
          //   template: 'assets/views/footer.template.html'
          // }
        }
      })
      .state({
        name: 'login',
        url: '/login',
        views: {
          topHeader: {
            templateUrl: 'assets/templates/top-header.template.html',
            controller: 'TopHeaderController',
            controllerAs: 'header'
          },
          header: {
            templateUrl: 'assets/templates/header.template.html'
          },
          navbar: {
            templateUrl: 'assets/templates/navbar.template.html'
          },
          content: {
            templateUrl: 'assets/templates/login.template.html',
            controller: 'LoginController',
            controllerAs: 'login'
          }
        }
      })
      
      $urlRouterProvider.otherwise('/');
  })
  .constant('appDefaults', {
    language: localStorage.getItem('local.language') || 'us',
    currency: localStorage.getItem('local.currency') || 'USD'
  })
  .constant('companyInfo', {
    email: 'company@email.com',
    phone: '+123-456-789'
  })
  .constant('locals', [
    {
      name: 'english',
      code: 'us'
    },
    {
      name: 'ελληνικά',
      code: 'gr'
    }
  ])
  .constant('currencies', [
    {
      name: 'dollar',
      code: 'USD',
      symbol: '$'
    },
    {
      name: 'pound',
      code: 'GBP',
      symbol: '£'
    },
    {
      name: 'euro',
      code: 'EUR',
      symbol: '€'
    }
  ])
  .run(['appDefaults', 'LocalizationService', 'AccountService', function(appDefaults, LocalizationService, AccountService) {
    LocalizationService.setLanguage(appDefaults.language);
    LocalizationService.setCurrency(appDefaults.currency);
    AccountService.update();
  }])
  .directive('href', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if (attrs.href == '#') {
          element.on('click', function(e) {
            e.preventDefault();
          });
        }
      }
    };
  })