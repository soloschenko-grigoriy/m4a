/**
 * @class Home controller
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    crypto   = require('crypto');

exports.index = function (req, res)
{
  if(!req.cookies.user){
    return res.redirect('/login');
  }
  
  User.findOne({ hash: req.cookies.user }, function(err, user){

    if(err || !user){
      return res.redirect('/login');
    }

    res.sendfile('public/main.html');
  });
};

/**
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res
 * 
 * @return {void} 
 */
exports.login = function (req, res)
{
  res.render('login');
};

/**
 * 
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res
 * 
 * @return {void} 
 */
exports.loginProcess = function (req, res)
{
  var email     = req.param('email'),
      password  = req.param('password');
      re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  if(!email || !password || !re.test(email)){
    return res.render('login', { error: true });
  }

  User.findOne({
    email     : email,
    password  : crypto.createHash('sha1').update(password).digest('hex')
  }, function(err, user){

    if(err || !user){
      return res.render('login', { error: true });
    }

    var date    = (new Date()).valueOf().toString(),
        random  = Math.random().toString(),
        hash    = crypto.createHash('sha1').update(date + random + user.email).digest('hex');
    
    user.update({ hash: hash }, function(err, user){
      
      if(err){
        return res.render('login', { error: true });
      }

      res.cookie('user', hash);
      res.redirect('/');
    });
    
  });
};

exports.registration = function (req, res)
{
  res.sendfile('public/registration.html');
};