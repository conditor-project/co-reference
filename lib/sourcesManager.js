/**
 * @prettier
 */
"use strict";

/* Module Require */
const _ = require("lodash");

const SourceManager = function () {
  this.docObjects = {};
  return this;
};

SourceManager.prototype.hasSources = function () {
  return Object.keys(this.docObjects).length <= 0;
};

SourceManager.prototype.hasSource = function (source) {
  return (
    typeof this.docObjects[source] !== "undefined" &&
    Array.isArray(this.docObjects[source]) &&
    this.docObjects[source].length > 0
  );
};

SourceManager.prototype.addSource = function (source, docObject) {
  if (typeof this.docObjects[source] === "undefined") this.docObjects[source] = [];
  this.docObjects[source].push(docObject);
};

SourceManager.prototype.hasDocObjects = function (source) {
  return (
    typeof this.docObjects[source] !== "undefined" &&
    Array.isArray(this.docObjects[source]) &&
    this.docObjects[source].length > 0
  );
};

SourceManager.prototype.getDocObjects = function (source) {
  if (typeof this.docObjects[source] !== "undefined" && Array.isArray(this.docObjects[source]))
    return this.docObjects[source];
  else return [];
};

SourceManager.prototype.getPropertyOf = function (source, property) {
  let docObjects = this.getDocObjects(source);
  for (let i = 0; i < docObjects.length; i++) {
    let result = _.get(docObjects[i], property, undefined);
    if (typeof result !== "undefined" && !SourceManager.isEmpty(result)) return result;
  }
};

SourceManager.prototype.getProperty = function (property) {
  let result = [];
  for (let source in this.docObjects) {
    let docObjects = this.getDocObjects(source);
    for (let i = 0; i < docObjects.length; i++) {
      let data = _.get(docObjects[i], property, undefined);
      if (Array.isArray(data) && data.length) {
        for (let j = 0; j < data.length; j++) {
          result.push(data[j]);
        }
      }
    }
  }
  return result;
};

SourceManager.isEmpty = function (data) {
  if (typeof data !== "undefined") {
    if (Array.isArray(data) || typeof data === "string") return data.length <= 0;
    else if (typeof data === "object") return Object.keys(data).length <= 0;
    else return false;
  } else return true;
};

SourceManager.prototype.merge = function (source, mapping) {
  let result = {};
  for (let key in mapping) {
    if (mapping[key] === true) {
      let value = this.getPropertyOf(source, key);
      if (typeof value !== "undefined") _.set(result, key, value, undefined);
    } else if (
      typeof mapping[key] === "object" &&
      typeof mapping[key].action !== "undefined" &&
      typeof mapping[key].id !== "undefined" &&
      typeof SourceManager.property[mapping[key].action] === "function"
    ) {
      let value = SourceManager.property[mapping[key].action](this, key, mapping[key].id);
      if (typeof value !== "undefined" && !SourceManager.isEmpty(value)) _.set(result, key, value, undefined);
    } else delete result[key];
  }
  return result;
};

SourceManager.property = {
  merge: function (sourceManager, property, id) {
    let data = sourceManager.getProperty(property),
      check = {},
      result = [];
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i][id] !== "undefined" && !check[data[i][id]]) {
        check[data[i][id]] = true;
        result.push(data[i]);
      }
    }
    return result;
  }
};

module.exports = SourceManager;
