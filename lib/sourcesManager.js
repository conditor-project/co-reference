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

SourceManager.prototype.getProperty = function (source, property) {
  let docObjects = this.getDocObjects(source);
  for (let i = 0; i < docObjects.length; i++) {
    let result = _.get(docObjects[i], property, undefined);
    if (typeof result !== "undefined" && !SourceManager.isEmpty(result)) return result;
  }
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
    let value = this.getProperty(source, key);
    if (mapping[key] && typeof value !== "undefined") _.set(result, key, value, undefined);
    else delete result[key];
  }
  return result;
};

module.exports = SourceManager;
