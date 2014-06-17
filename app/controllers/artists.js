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
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1,
      perPage = 30,
      options = {
        perPage: perPage,
        page: page
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