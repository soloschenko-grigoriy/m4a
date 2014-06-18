/**
 * @class Album model
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
  _artist : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }
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
  load: function (id, cb) {
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
  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
      .populate('_artist')
      .limit(options.limit)
      .sort(options.sort)
      .exec(cb);
  }

};

/**
 * Register
 */
mongoose.model('Album', Schema);
