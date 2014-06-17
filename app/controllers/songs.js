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
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1,
      perPage = 30,
      options = {
        perPage: perPage,
        page: page
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
  Song.load(req.params.id, function (err, article){
    if(err){
      return next(err);
    }

    if(!article){
      return res.send('404', 'Not found');
    }

    res.json(article);
  });
};