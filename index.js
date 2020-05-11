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
        break;
      }
    }
    if (typeof result === "undefined")
      return { err: true, msg: "docObject corresponding to one of given sources not found", res: result };
  } else return { err: true, msg: "priorities not found", res: result };
  if (typeof rules.keys === "object")
    for (let key in rules.keys) {
      if (Array.isArray(rules.keys[key]) && rules.keys[key].length > 0)
        for (let i = 0; i < rules.keys[key].length; i++) {
          let source = rules.keys[key][i],
            value = _.get(data[source], key, undefined);
          if (typeof value !== "undefined") {
            _.set(result, key, value);
            break;
          }
        }
    }
  return { err: false, msg: "success", res: result };
};

/* TO DO : merge data from multiples source */
business.merge = function (docObjects) {};

module.exports = business;
