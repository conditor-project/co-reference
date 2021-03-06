/**
 * @prettier
 */
"use strict";

/* Module Require */
const conditorRules = {
    default: require("./rules/default.json"),
    noFulltext: require("./rules/hal.hasNotFulltext.json")
  },
  mapping = require("./resources/mapping.json"),
  SourcesManager = require("./lib/sourcesManager.js"),
  _ = require("lodash");

const business = {};

business.select = function (docObjects, rules = conditorRules.default, isConditor = true) {
  let sourcesManager = new SourcesManager(),
    sources = {},
    properties,
    result = undefined;
  if (typeof mapping !== "object") return { err: true, msg: "mapping not found", res: result };
  if (Array.isArray(docObjects) && docObjects.length > 0) {
    for (let i = 0; i < docObjects.length; i++) {
      let docObject = docObjects[i];
      if (typeof docObject === "object" && typeof docObject.source !== "undefined") {
        sourcesManager.addSource(docObjects[i].source, docObjects[i]);
      }
    }
    if (sourcesManager.hasSources()) return { err: true, msg: "docObjects with source not found", res: result };
  } else return { err: true, msg: "docObjects not found", res: result };
  if (isConditor && sourcesManager.hasSource("hal") && !sourcesManager.getPropertyOf("hal", "hasFulltext"))
    rules = conditorRules.noFulltext;
  if (typeof rules !== "undefined" && Array.isArray(rules.priorities) && rules.priorities.length > 0) {
    for (let i = 0; i < rules.priorities.length; i++) {
      if (sourcesManager.hasDocObjects(rules.priorities[i])) {
        let merging = sourcesManager.merge(rules.priorities[i], mapping);
        result = merging.data;
        properties = merging.properties;
        sources[rules.priorities[i]] = true;
        break;
      }
    }
    if (typeof result === "undefined")
      return { err: true, msg: "docObject corresponding to one of given sources not found", res: result };
  } else return { err: true, msg: "priorities not found", res: result };
  if (typeof rules.keys === "object")
    for (let key in rules.keys) {
      let currentRules = rules.priorities; // default value
      if (Array.isArray(rules.keys[key]) && rules.keys[key].length > 0) currentRules = rules.keys[key]; // custom value
      for (let i = 0; i < currentRules.length; i++) {
        let source = currentRules[i];
        if (mapping[key] === true && sourcesManager.hasSource(source)) {
          let value = sourcesManager.getPropertyOf(source, key);
          if (typeof value !== "undefined") {
            _.set(result, key, value);
            sources[source] = true;
            properties[key] = source;
            break;
          }
        }
      }
    }
  properties.sources = typeof properties.sources !== "undefined" ? properties.sources : Object.keys(sources);
  result.origins = properties;
  return { err: false, msg: "success", res: result };
};

module.exports = business;
