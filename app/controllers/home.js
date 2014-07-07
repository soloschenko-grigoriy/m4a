/**
 * @class Home controller
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose     = require('mongoose'),
    User         = mongoose.model('User'),
    Invite       = mongoose.model('Invite'),
    crypto       = require('crypto'),
    upload       = require('jquery-file-upload-middleware'),
    config       = require('config'),
    fs           = require('fs');

/**
 *
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res
 *
 * @return {void} 
 */
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
  if(req.cookies.user){
    return res.redirect('/');
  }

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
      password  = req.param('password'),
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

/**
 *
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res
 *
 * @return {void} 
 */
exports.registration = function (req, res)
{
  if(req.cookies.user){
    return res.redirect('/');
  }

  res.render('registration', { errors: {}, values: {
    name      : req.param('name')  ? req.param('name')  : '',
    email     : req.param('email') ? req.param('email') : '',
    invite    : req.param('code')  ? req.param('code')  : '',
    confirm   : '',
    password  : ''
  }});
};

/**
 *
 * 
 * @param  {Express.Request} req
 * @param  {Express.Responce} res
 *
 * @return {void} 
 */
exports.registrationProcess = function(req, res)
{

  var errors    = {},
      email     = req.param('email'),
      name      = req.param('name'),
      invite    = req.param('invite'),
      password  = req.param('password'),
      confirm   = req.param('confirm'),
      hasError  = false,
      re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var values = {
    name      : name,
    email     : email,
    invite    : invite,
    confirm   : confirm,
    password  : password
  };

  if(!name){      hasError = true; errors.name     = 'empty'; }
  if(!email){     hasError = true; errors.email    = 'empty'; }
  if(!invite){    hasError = true; errors.invite   = 'empty'; }
  if(!confirm){   hasError = true; errors.confirm  = 'empty'; }
  if(!password){  hasError = true; errors.password = 'empty'; }
  
  if(hasError){
    return res.render('registration', { errors:  errors, values: values });
  }

  if(!re.test(email)){      hasError = true; errors.email     = 'invalid'; }
  if(password.length < 6){  hasError = true; errors.password  = 'invalid'; }
  if(confirm !== password){ hasError = true; errors.confirm   = 'invalid'; }


  if(hasError){
    return res.render('registration', { errors:  errors, values: values });
  }
  

  User.findOne({ email: email }, function(err, user){ // find out if the email is uniq

    if(err){
      return res.render('registration', { errors: { unkown: err }, values: values });
    }

    if(user){
      return res.render('registration', { errors: { email: 'not-uniq' }, values: values });
    }

    Invite.findOne({ email: email, code: invite, used: false }, function(err, iviteModel){ // find out the invite
      if(err){
        return res.render('registration', { errors: { unkown: err }, values: values });
      }

      if(!iviteModel){
        return res.render('registration', { errors: { invite: 'invalid' }, values: values });
      }

      iviteModel.update({ used: true, usedDate: new Date() }, function(err, iviteModel){ // update invote model

        if(err){
          return res.render('registration', { errors: { unkown: err }, values: values });
        }

        var hash = crypto.createHash('sha1').update( new Date().valueOf().toString() + Math.random().toString() + email).digest('hex');
        User.create({ // filaly create user
          name      : name,
          email     : email,
          password  : crypto.createHash('sha1').update(password).digest('hex'),
          hash      : hash
        }, function(err, user){

          if(err){
            return res.render('registration', { errors: { unkown: err }, values: values });
          }

          // and auth him automaticly
          res.cookie('user', hash);
          res.redirect('/');

        });
      });
    });

  });
};

exports.upload = function(req, res, next)
{
  upload.fileHandler({
    uploadDir: config.root + '/public/assets/uploads/users/',
    uploadUrl: '/assets/uploads/users',
    imageVersions: {
      '128x128': {
        width: 128,
        height: 128
      },
      '64x64': {
        width: 64,
        height: 64
      },
      '32x32': {
        width: 32,
        height: 64
      },
    }
  })(req, res, next);
};

