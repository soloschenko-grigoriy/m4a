/**
 * @class Song model
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
  album   : { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  artist  : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  genres  : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
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
      .populate('album')
      .populate('artist')
      .populate('genres')
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
    if(options.artist){
      options.criteria = {
        artist: mongoose.Schema.Types.ObjectId(options.artist)
      };
    }
    
    this
      .find(options.criteria || {})
      .populate('album')
      .populate('artist')
      .populate('genres')
      .skip(options.page * options.limit)
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
    if(options.artist && options.artist._id){
      options.artist = options.artist._id;
    }else{
      options.artist = null;
    }
    
    if(options.album && options.album._id){
      options.album = options.album._id;
    }else{
      options.album = null;
    }

    if(options.genres){
      var ids = [];
      for(var key in options.genres){
        if(options.genres[key]._id){
          ids.push(options.genres[key]._id);
        }
      }

      options.genres = ids;
    }else{
      options.genres = null;
    }
    
    return new this(options).save(cb);
  }
};

/**
 * Register
 */
mongoose.model('Song', Schema);
