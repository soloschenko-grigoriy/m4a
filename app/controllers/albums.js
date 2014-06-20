/**
 * @class Albums controller
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose'),
    Album    = mongoose.model('Album'),
    Artist   = mongoose.model('Artist');

/**
 * Get list controller
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res 
 * 
 * @return {void}  
 */
exports.list = function (req, res)
{
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1,
      perPage = 30,
      options = {
        perPage: perPage,
        page: page,
        limit: req.param('limit') ? req.param('limit') : 0,
        sort: req.param('sort') ? req.param('sort') : '_id'
      };

  Album.list(options, function(err, articles) {
    if(err){
      return res.send('500', err);
    }

    res.json(articles);
  });
};

/**
 * Get controller
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res 
 * 
 * @return {void}  
 */
exports.load = function (req, res, next)
{
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

exports.create = function (req, res, next)
{
  var options = {
    name      : req.param('name'),
    img       : req.param('img'),
    artist   : req.param('artist')
  };
  
  Album.create(options, function(err, item){
    if(err){
      return next(err);
    }

    if(!item){
      return res.send('404', 'Not found');
    }

    Album.load(item._id, function (err, item){
      if(err){
        return next(err);
      }

      if(!item){
        return res.send('404', 'Not found');
      }

      res.json(item);
    });
  });
};