/**
 * @class Song model
 *
 * version 0.0.1
 *
 * @author Soloschenko G. soloschenko@gmail.com
 * 
 */
var mongoose = require('mongoose'),
    Album    = mongoose.model('Album'),
    Artist   = mongoose.model('Artist');

/**
 * 
 * @type {Mongoose.Schema}
 */
var Schema = new mongoose.Schema({
  name    : String,
  img     : String,
  _artist : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  _album  : { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  date    : { type: Date, default : Date.now}
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
   */
  load: function (id, cb)
  {
    this
      .findById(id)
      .populate('_artist')
      .populate('_album')
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
      .populate('_artist')
      .populate('_album')
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
    if(options._artist && options._artist._id){
      options._artist = options._artist._id;
    }else{
      options._artist = null;
    }

    if(options._album && options._album._id){
      options._album = options._album._id;
    }else{
      options._album = null;
    }

    return new this(options).save(cb);
  }
};

/**
 * Register
 */
mongoose.model('Song', Schema);
