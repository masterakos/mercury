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
      });
      
      $urlRouterProvider.otherwise('/');
  })
  .constant('appDefaults', {
    language: 'us',
    currency: 'dollar'
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
  .run(['appDefaults', 'localizationService', function(appDefaults, localizationService) {
    localizationService.setLanguage(appDefaults.language);
  }])