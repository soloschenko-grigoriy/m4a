/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * 
 * @type {Mongoose.Schema}
 */
var Schema = new mongoose.Schema({
  name    : String,
  img     : String,
  genres  : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
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
      .populate('genres')
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
      .populate('genres')
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
mongoose.model('Artist', Schema);