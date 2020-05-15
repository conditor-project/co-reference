/**
 * @prettier
 */
"use strict";

/* Module Require */
const defaultRules = require("./rules.default.json"),
  _ = require("lodash");

const business = {};

business.select = function (docObjects, rules = defaultRules) {
  let data = {},
    sources = {},
    properties = {},
    result = undefined;
  if (Array.isArray(docObjects) && docObjects.length > 0) {
    for (let i = 0; i < docObjects.length; i++) {
      let docObject = docObjects[i];
      if (typeof docObject === "object" && typeof docObject.source !== "undefined")
        data[docObjects[i].source] = docObjects[i];
    }
    if (Object.keys(data).length <= 0) return { err: true, msg: "docObjects with source not found", res: result };
  } else return { err: true, msg: "docObjects not found", res: result };
  if (Array.isArray(rules.priorities) && rules.priorities.length > 0) {
    for (let i = 0; i < rules.priorities.length; i++) {
      if (typeof data[rules.priorities[i]] !== "undefined") {
        result = data[rules.priorities[i]];
        sources[rules.priorities[i]] = true;
        break;
      }
    }
    if (typeof result === "undefined")
      return { err: true, msg: "docObject corresponding to one of given sources not found", res: result };
  } else return { err: true, msg: "priorities not found", res: result };
  if (typeof rules.keys === "object")
    for (let key in rules.keys) {
      let currentRules = rules.priorities;
      properties[key] = currentRules[0];
      if (Array.isArray(rules.keys[key]) && rules.keys[key].length > 0) currentRules = rules.keys[key];
      for (let i = 0; i < currentRules.length; i++) {
        let source = currentRules[i],
          value = _.get(data[source], key, undefined);
        if (typeof value !== "undefined" && !business.isEmpty(value)) {
          _.set(result, key, value);
          sources[source] = true;
          properties[key] = source;
          break;
        }
      }
    }
  properties.sources = Object.keys(sources);
  result.origins = properties;
  return { err: false, msg: "success", res: result };
};

business.isEmpty = function (data) {
  if (typeof data !== "undefined") {
    if (Array.isArray(data) || typeof data === "string") return data.length <= 0;
    else if (typeof data === "object") return Object.keys(data).length <= 0;
    else return false;
  } else return true;
};

/* TO DO : merge data from multiples source */
business.merge = function (docObjects) {};

module.exports = business;
