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
