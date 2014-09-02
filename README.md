# ampersand-collection-pouchdb-mixin

# install

```
npm install ampersand-collection-pouchdb-mixin
```

## example

```javascript

var _ = require('underscore');

var AmpersandModel = require('ampersand-model');
var AmpersandPouchModelMixin = require('ampersand-model-pouchdb-mixin');

var AmpersandCollection = require('ampersand-collection');
var AmpersandUnderscoreMixin = require('ampersand-collection-underscore-mixin');
var AmpersandCollectionRestMixin = require('ampersand-collection-rest-mixin');
var AmpersandPouchCollectionMixin = require('ampersand-collection-pouchdb-mixin');

var Model = AmpersandModel.extend(AmpersandPouchModelMixin, {
  pouch: {
    database: 'mydb'
  },
  props: {
    firstName: 'string',
    lastName: 'string'
  }
});

module.exports = AmpersandCollection.extend(
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

```


