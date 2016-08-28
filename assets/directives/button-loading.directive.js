angular
  .module('MercuryApp')
  .directive('buttonLoading', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        attrs.$observe('buttonLoading', function(val) {
          if (val == 'true' || val == true) {
            $(element).button('loading');
          } else {
            $(element).button('reset');
          }
        });
      }
    };
  });
