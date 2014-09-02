require('./helper');

var test = require('tape');
var _ = require('underscore');

var AmpersandModel = require('ampersand-model');
var AmpersandPouchModelMixin = require('ampersand-model-pouchdb-mixin');

var AmpersandCollection = require('ampersand-collection');
var AmpersandUnderscoreMixin = require('ampersand-collection-underscore-mixin');
var AmpersandCollectionRestMixin = require('ampersand-collection-rest-mixin');
var AmpersandPouchCollectionMixin = require('../ampersand-collection-pouchdb-mixin');

var Model = AmpersandModel.extend(AmpersandPouchModelMixin, {
  pouch: {
    database: 'mydb'
  },
  props: {
    firstName: 'string',
    lastName: 'string'
  }
});

var Collection = AmpersandCollection.extend(
  AmpersandPouchCollectionMixin,
  AmpersandCollectionRestMixin,
  AmpersandUnderscoreMixin, {
    mainIndex: '_id',
    model: Model,
    pouch: {
      database: 'mydb',
      fetch: 'query',
      options: {
        query: {
          include_docs: true,
          fun: {
            map: function(doc) {
              if (doc) {
                emit(doc, null);
              }
            }
          },
          limit: 10
        },
        changes: {
          include_docs: true,
          filter: function(doc) {
            return doc;
          }
        }
      }
    },
    parse: function(result) {
      // only return actual docs
      return _.pluck(result.rows, 'doc');
    }
  });

test('collection should have a pouch property set', function (t) {
  var c = new Collection();
  t.ok(c.pouch, 'exposes pouch property');
  t.equal(c.pouch.database, 'mydb');
  t.end();
});

test('collection should have a mainIndex of \'_id\'', function (t) {
  var c = new Collection();
  t.equal(c.mainIndex, '_id');
  t.end();
});

test('existance of underscore methods', function (t) {
  var c = new Collection();
  t.ok(c.find, 'has find method');
  t.ok(c.filter, 'has filter method');
  t.end();
});

