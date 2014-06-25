/**
 * @class Artist controller
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose'),
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
  var options = {
    page   : req.param('page')    ? req.param('page')   : 0,
    limit  : req.param('limit')   ? req.param('limit')  : 50,
    sort   : req.param('sort')    ? req.param('sort')   : '_id'
  };
  
  Artist.list(options, function(err, articles) {
    if(err){
      res.send('500', err);

      return;
    }

    res.json(articles);
  });

  return;
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
  Artist.load(req.params.id, function (err, article){
    if(err){
      next(err);

      return;
    }

    if(!article){
      res.send('404', 'Not found');

      return;
    }

    res.json(article);
  });
};

exports.create = function (req, res, next)
{
  var options = {
    name      : req.param('name'),
    img       : req.param('img'),
    genres    : req.param('genres')
  };
  
  Artist.create(options, function(err, item){
    if(err){
      return next(err);
    }

    if(!item){
      return res.send('404', 'Not found');
    }

    Artist.load(item._id, function (err, item){
      if(err){
        return next(err);
      }

      if(!item){
        return res.send('404', 'Not found');
      }

      res.json(item);
    });
  });
}