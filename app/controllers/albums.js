/**
 * [Album description]
 * @type {[type]}
 */
var mongoose = require('mongoose'),
    Album    = mongoose.model('Album');

exports.list = function (req, res){

  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1,
      perPage = 30,
      options = {
        perPage: perPage,
        page: page
      };

  Album.list(options, function(err, articles) {
    if(err){
      return res.send('500', err);
    }

    res.json(articles);
  });
};

exports.load = function (req, res, next){

  Album.load(req.params.id, function (err, article){
    if(err){
      return next(err);
    }

    if(!article){
      return res.send('404', 'Not found');
    }

    res.json(article);
  });
};