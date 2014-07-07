/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * 
 * @type {Mongoose.Schema}
 */
var Schema = new mongoose.Schema({
  email    : String,
  code     : String,
  used     : { type: Boolean, default: false },
  usedDate : Date
});

/**
 * Statics
 */
Schema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb)
  {
    this
      .findById(id)
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  list: function (options, cb)
  {
    this
      .find(options.criteria || {})
      .limit(options.limit)
      .skip(options.page * options.limit)
      .sort(options.sort)
      .exec(cb);
  },

  /**
   * Create route
   * @param  {Object}   options 
   * @param  {Function} cb      
   * 
   * @return {Artist}           
   */
  create: function(options, cb)
  {
    return new this(options).save(cb);
  }

};

/**
 * Register
 */
mongoose.model('Invite', Schema);