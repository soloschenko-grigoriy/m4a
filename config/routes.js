
/**
 * Module dependencies.
 */
var home = require('home');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    res.status(500).send('500', err.stack);
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send('404', 'Not found');
  });

};
