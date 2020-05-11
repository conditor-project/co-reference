/**
 * @prettier
 */
"use strict";

/* Module Require */
const pkg = require("../package.json"),
  business = require("../index.js"),
  TU = require("auto-tu");

// Test data
const dataset = {
  business: require("./dataset/in/data/business.json"),
};

// Map of functions used in test
const wrapper = {};

/**
 * - classifier
 *   - load()
 */
wrapper.business = {
  select: function (fn, item, cb) {
    let select = fn(item.arguments.docObjects, item.arguments.rules);
    if (select.err) return cb(select.msg);
    else return cb(JSON.stringify(select.res));
  },
};

// Tested Objects
const myObject = {
  business: {
    select: business.select,
  },
};

/**
 * Start test
 */
TU.start({
  description: pkg.name + "/index.js",
  root: "co-reference",
  object: myObject,
  wrapper: wrapper,
  dataset: dataset,
});
