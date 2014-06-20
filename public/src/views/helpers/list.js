define(['handlebars'], function (Handlebars) {
  Handlebars.registerHelper('list', function(context, options){
    var ret = '',
        first = true;
        
    for(var key in context){
      var test = ret;
      if(!first){
        test += ' / ';
      }
      test += context[key].name;
      first = false;
      if(test.length > 33){
        return ret;
      }

      ret = test;
    }
    return ret;
  });
});