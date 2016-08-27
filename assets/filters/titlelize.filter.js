angular
  .module('MercuryApp')
  .filter('titlelize', function() {
    return function(text) {
      var titlelized = '';
      text.split(' ').forEach(function(word) {
        titlelized += word[0].toUpperCase()  + word.substring(1);
      });
      return titlelized;
    };
  });
