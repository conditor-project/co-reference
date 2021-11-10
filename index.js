const _ = require('lodash');
const mapping = require('./resources/mapping.json');
const SourceManager = require('./lib/SourcesManager.js');

const conditorRules = {
  default: require('./rules/default.json'),
  noFulltext: require('./rules/hal.hasNotFulltext.json'),
};

const business = {};

business.select = (docObjects, rules = conditorRules.default, isConditor = true) => {
  const sourceManager = new SourceManager();
  const sources = {};
  let properties;
  let result;

  if (!_.isObject(mapping)) return { err: true, msg: 'mapping not found', res: result };

  if (!SourceManager.isNonEmptyArray(docObjects)) return { err: true, msg: 'docObjects not found', res: result };

  for (const docObject of docObjects) {
    if (!_.isObject(docObject) || !docObject.source) continue;

    sourceManager.addSource(docObject.source, docObject);
  }

  if (!sourceManager.hasSources()) return { err: true, msg: 'docObjects with source not found', res: result };

  if (isConditor && sourceManager.hasSource('hal') && !sourceManager.getPropertyOf('hal', 'hasFulltext')) {
    rules = conditorRules.noFulltext;
  }

  if (!SourceManager.isNonEmptyArray(rules.priorities)) {
    return { err: true, msg: 'priorities not found', res: result };
  }

  sourceManager.setPriorities(rules.priorities);

  for (const priority of rules.priorities) {
    if (!sourceManager.hasDocObjects(priority)) continue;

    const merging = sourceManager.merge(priority, mapping);
    result = merging.data;
    properties = merging.properties;
    sources[priority] = true;

    break;
  }

  if (!result) return { err: true, msg: 'docObject corresponding to one of given sources not found', res: result };

  if (!_.isObject(rules.keys)) return { err: true, msg: 'rules not found', res: result };

  for (const key in rules.keys) {
    let currentRules = rules.priorities; // default value
    if (SourceManager.isNonEmptyArray(rules.keys[key])) currentRules = rules.keys[key]; // custom value

    for (const source of currentRules) {
      if (mapping[key] !== true || !sourceManager.hasSource(source)) continue;

      const value = sourceManager.getPropertyOf(source, key);
      if (value == null) continue;

      _.set(result, key, value);
      sources[source] = true;
      properties[key] = source;

      break;
    }
  }

  properties.sources = properties.sources ? properties.sources : Object.keys(sources);
  result.origins = properties;

  return { err: false, msg: 'success', res: result };
};

module.exports = business;
