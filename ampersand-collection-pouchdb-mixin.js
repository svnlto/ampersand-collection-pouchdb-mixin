var pouchSync = require('ampersand-pouchdb-sync');
var extend = require('extend-object');


// Wrap an optional error callback with a fallback error event.
var wrapError = function(model, options) {
  var error = options.error;
  options.error = function(resp) {
    if (error) error(model, resp, options);
    model.trigger('error', model, resp, options);
  };
};

module.exports = {

  constructor: function () {
    this.sync = pouchSync.apply(this, [this.pouch]);
  },

  sync: function() {
    return sync.apply(this, arguments);
  }

};
