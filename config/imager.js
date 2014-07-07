module.exports = {
  variants: {
    items: {
      // keepNames: true,
      resize: {
        mini : '300x200',
        preview: '800x600'
      },
      crop: {
        thumb: '200x200',
        thumb_center: '200x200 Center'
      },
      resizeAndCrop: {
        large: { resize: '1000x1000', crop: '900x900' }
      },
      thumbnail: {
        better_thumb: '100x100 NorthWest',
        better_thumb_center: '100x100 Center'
      }
    },

    gallery: {
      rename: function (filename) {
        return 'MyFileManipulationLogic_' + filename;
      },
      crop: {
        thumb: '100x100'
      }
    }
  },

  storage: {
    Local: {
      path: '/Users/solosenkogrigorij/work/m4a/'
    },
    uploadDirectory: '/public/uploads/'
  },

  debug: true
};