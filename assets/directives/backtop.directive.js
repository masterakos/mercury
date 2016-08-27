angular
  .module('MercuryApp')
  .directive('backTop', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs, ctrl) {
        $(window).scroll(function() {
          if ($(this).scrollTop() > 70) {
            $(element).fadeIn();
          } else {
            $(element).fadeOut();
          }
        });
      }
    };
  });
