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
