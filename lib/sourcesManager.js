/* eslint-disable no-labels */

/* Module Require */
const _ = require('lodash');

class SourceManager {
  constructor () {
    this.docObjects = {};
    this.priorities = [];
  }

  setPriorities (priorities) {
    this.priorities = priorities;
  }

  getSources () {
    return Object.keys(this.docObjects);
  }

  getSourcesOrderedByPriority () {
    const sourcesOrderedByPriority = [];
    if (_.isArray(this.priorities) && !_.isEmpty(this.priorities)) {
      for (const priority of this.priorities) {
        if (this.getSources().includes(priority)) sourcesOrderedByPriority.push(priority);
      }
    }
    return sourcesOrderedByPriority;
  }

  hasSources () {
    return Object.keys(this.docObjects).length <= 0;
  }

  hasSource (source) {
    return (
      typeof this.docObjects[source] !== 'undefined' &&
      Array.isArray(this.docObjects[source]) &&
      this.docObjects[source].length > 0
    );
  }

  addSource (source, docObject) {
    if (typeof this.docObjects[source] === 'undefined') this.docObjects[source] = [];
    this.docObjects[source].push(docObject);
  }

  hasDocObjects (source) {
    return (
      typeof this.docObjects[source] !== 'undefined' &&
      Array.isArray(this.docObjects[source]) &&
      this.docObjects[source].length > 0
    );
  }

  getDocObjects (source) {
    if (typeof this.docObjects[source] !== 'undefined' && Array.isArray(this.docObjects[source])) {
      return this.docObjects[source];
    }

    return [];
  }

  getPropertyOf (source, property) {
    const docObjects = this.getDocObjects(source);
    for (let i = 0; i < docObjects.length; i++) {
      const result = _.get(docObjects[i], property, undefined);
      if (typeof result !== 'undefined' && !SourceManager.isEmpty(result)) return result;
    }
  }

  getProperty (property) {
    const result = [];
    for (const source in this.docObjects) {
      const docObjects = this.getDocObjects(source);
      for (let i = 0; i < docObjects.length; i++) {
        const data = _.get(docObjects[i], property, undefined);
        if (Array.isArray(data) && data.length) {
          for (let j = 0; j < data.length; j++) {
            result.push(data[j]);
          }
        } else if (typeof data !== 'undefined') result.push(data);
      }
    }
    return result;
  }

  addOrcIdInAuthors (authors) {
    for (const currentAuthor of authors) {
      // If the current author already has an orcId or has no forename or no surname, go to the next author
      if (currentAuthor.orcId || _.get(currentAuthor, 'enrichments.orcId') || !currentAuthor.forename || !currentAuthor.surname) continue;
      sourcesLoop: for (const otherSource of this.getSourcesOrderedByPriority()) {
        for (const docObjectFromOtherSource of this.docObjects[otherSource]) {
          const authorsFromOtherSource = docObjectFromOtherSource.authors;
          // If there is no author in this source, go to the next source
          if (!authorsFromOtherSource) continue;
          // Get the authors from this source that have an orcId (the orcId can come from an enrichment)
          const authorsFromOtherSourceWithOrcId = _.filter(authorsFromOtherSource, (author) => author.orcId || _.get(author, 'enrichments.orcId'));
          // If the authors from this source don't have an orcId, go to the next source
          if (_.isEmpty(authorsFromOtherSourceWithOrcId)) continue;
          for (const authorFromOtherSourceWithOrcId of authorsFromOtherSourceWithOrcId) {
            // If the one of the authors from another source with an orcId is the same as our current author,
            // we inject the orcId of the author from the other source into the current author
            if (SourceManager.authorsEqual(authorFromOtherSourceWithOrcId, currentAuthor)) {
              // The orcId of the author from the other source can come from an enrichment
              currentAuthor.orcId = authorFromOtherSourceWithOrcId.orcId || authorFromOtherSourceWithOrcId.enrichments.orcId;
              // eslint-disable-next-line no-labels
              break sourcesLoop;
            }
          }
        }
      }
    }
  }

  merge (source, mapping) {
    const result = {
      data: {},
      properties: {},
    };
    let hasMergedData = false;
    for (const key in mapping) {
      if (mapping[key] === true) {
        const value = this.getPropertyOf(source, key);
        if (typeof value !== 'undefined') {
          // Special treatment for the authors
          if (key === 'authors') this.addOrcIdInAuthors(value);
          result.properties[key] = source;
          _.set(result.data, key, value, undefined);
        }
      } else if (typeof mapping[key] === 'object' &&
        typeof mapping[key].action !== 'undefined' &&
        typeof SourceManager.property[mapping[key].action] === 'function') {
        const value = SourceManager.property[mapping[key].action](
          this,
          key,
          typeof mapping[key].id !== 'undefined' ? mapping[key].id : undefined
        );
        if (typeof value !== 'undefined' && !SourceManager.isEmpty(value)) {
          hasMergedData = true;
          _.set(result.data, key, value, undefined);
          result.properties[key] = this.getSources();
        }
      } else {
        if (_.has(result, key)) _.set(result.data, key, undefined);
      }
    }
    if (hasMergedData) result.properties.sources = this.getSources();
    return result;
  }

  static isEmpty (data) {
    if (typeof data !== 'undefined') {
      if (Array.isArray(data) || typeof data === 'string') return data.length <= 0;
      else if (typeof data === 'object') return Object.keys(data).length <= 0;
      else return false;
    } else return true;
  }

  static authorsEqual (firstAuthor, secondAuthor) {
    const sanitizeName = (author) => {
      return (author.forename.trim() + author.surname.trim())
        .normalize('NFD') // We decompose combined graphemes into the combination of simple ones (è becomes e + `)
        .replace(/[\u0300-\u036f]/g, ''); // We remove every diacritic
    };

    return sanitizeName(firstAuthor) === sanitizeName(secondAuthor);
  }
}

SourceManager.property = {
  merge: (sourceManager, property, id) => {
    const data = sourceManager.getProperty(property);
    const check = {};
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (typeof id === 'undefined') {
        if (typeof data[i] !== 'object' && result.indexOf(data[i]) < 0) result.push(data[i]);
      } else {
        if (typeof data[i] === 'object' && typeof data[i][id] !== 'undefined' && !check[data[i][id]]) {
          check[data[i][id]] = true;
          result.push(data[i]);
        }
      }
    }
    return result;
  },
};

module.exports = SourceManager;
