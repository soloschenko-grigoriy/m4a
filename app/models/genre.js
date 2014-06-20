/**
 * @class Genres model
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose');

/**
 * 
 * @type {Mongoose.Schema}
 */
var Schema = new mongoose.Schema({
  name    : String,
  img     : String,
});

/**
 * Statics
 */
Schema.statics = {

  /**
   * Find item by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   */
  load: function (id, cb)
  {
    this
      .findById(id)
      .exec(cb);

    return this;
  },

  /**
   *
   * @param {Object} options
   * @param {Function} cb
   */
  list: function (options, cb)
  {
    var criteria = options.criteria || {};

    this
      .find(criteria)
      .limit(options.limit)
      .sort(options.sort)
      .exec(cb);

    return this;
  },

  /**
   * Create route
   * @param  {[type]}   options [description]
   * @param  {Function} cb      [description]
   * 
   * @return {[type]}           [description]
   */
  create: function(options, cb)
  {
    return new this(options).save(cb);
  }
};

/**
 * Register
 */
mongoose.model('Genre', Schema);
