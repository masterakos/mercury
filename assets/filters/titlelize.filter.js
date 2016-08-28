angular
  .module('MercuryApp')
  .filter('titlelize', function() {
    return function(text) {
      if (!text) return text;
      return text.split(' ').map(function(word) {
        return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").length > 3
          ? word[0].toUpperCase() + word.substr(1)
          : word;
      }).join(' ');
    };
  });
