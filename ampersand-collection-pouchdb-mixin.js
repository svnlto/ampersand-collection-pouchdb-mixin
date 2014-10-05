var pouchSync = require('ampersand-pouchdb-sync');

module.exports = {

  initialize: function () {
    this.sync = pouchSync.apply(this, [this.pouch]);
  },

  sync: function() {
    return sync.apply(this, arguments);
  }

};
