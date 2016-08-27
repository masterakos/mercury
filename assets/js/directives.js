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

angular
  .module('MercuryApp')
  .directive('select2', function() {
    return {
      restrict: 'AC',
      link: function(scope, element, attrs, ctrl) {
        $(element).select2()
      }
    };
  });

angular
  .module('MercuryApp')
  .directive('tooltip', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, ctrl) {
        $(element).tooltip({ title: attrs.tooltip, container: 'body' });
      }
    };
  });

angular
  .module('MercuryApp')
  .directive('touchspin', function() {
    return {
      restrict: 'AC',
      link: function(scope, element, attrs, ctrl) {
        $(element).TouchSpin();
      }
    };
  });