/**
 * @class Albums controller
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose'),
    Genre    = mongoose.model('Genre');

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

  Genre.list(options, function(err, articles) {
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
  Genre.load(req.params.id, function (err, article){
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
  };
  
  Genre.create(options, function(err, item){
    if(err){
      return next(err);
    }

    if(!item){
      return res.send('404', 'Not found');
    }

    Genre.load(item._id, function (err, item){
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