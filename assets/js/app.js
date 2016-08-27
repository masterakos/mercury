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
            templateUrl: 'assets/templates/top-header.template.html'
          },
          header: {
            templateUrl: 'assets/templates/header.template.html'
          },
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
  });