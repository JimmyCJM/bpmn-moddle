require('babel-register')({
  ignore: /node_modules\/(?!(min-dash|lodash|moddle|moddle-xml|cmof-parser))/
});

var chai = require('chai');
var matchers = require('./matchers');

// add matchers
chai.use(matchers);

// expose expect as global
global.expect = chai.expect;