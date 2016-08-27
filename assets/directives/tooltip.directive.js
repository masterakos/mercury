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
