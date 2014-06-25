/**
 * @class Album model
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose      = require('mongoose');

/**
 * 
 * @type {Mongoose.Schema}
 */
var Schema = new mongoose.Schema({
  name    : String,
  img     : String,
  artist  : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }
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
      .populate('artist')
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
      .populate('artist')
      .limit(options.limit)
      .skip(options.page * options.limit)
      .sort(options.sort)
      .exec(cb);

    return this;
  },


  /**
   * Create route
   * @param  {Object}   options 
   * @param  {Function} cb      
   * 
   * @return {Album}           
   */
  create: function(options, cb)
  {
    if(options.artist && options.artist._id){
      options.artist = options.artist._id;
    }else{
      options.artist = null;
    }

    return new this(options).save(cb);
  }

};


/**
 * Register
 */
mongoose.model('Album', Schema);
