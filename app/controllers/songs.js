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
    Artist   = mongoose.model('Artist'),
    Song     = mongoose.model('Song');

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
    sort   : req.param('sort')    ? req.param('sort')   : '_id',
    artist : req.param('artist')  ? req.param('artist') : '',
  };

  Song.list(options, function(err, articles) {
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
  Song.load(req.params.id, function (err, song){
    if(err){
      return next(err);
    }

    if(!song){
      return res.send('404', 'Not found');
    }

    res.json(song);
  });
};

exports.create = function (req, res, next)
{
  var options = {
    name      : req.param('name'),
    img       : req.param('img'),
    genres    : req.param('genres'),
    artist    : req.param('artist'),
    album     : req.param('album')
  };
  
  Song.create(options, function(err, song){
    if(err){
      return next(err);
    }

    if(!song){
      return res.send('404', 'Not found');
    }

    Song.load(song._id, function (err, song){
      if(err){
        return next(err);
      }

      if(!song){
        return res.send('404', 'Not found');
      }

      res.json(song);
    });
  });
};