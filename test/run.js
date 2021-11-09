/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const testData = require('./dataset/in/data');
const expected = require('./dataset/expected');
const business = require('../index');

describe('index.js', () => {
  describe('#select()', () => {
    it('Construction d\'une notice unique (échec : aucun docObjects n\'a été trouvé)', (done) => {
      expectError(testData.noDocObjects, 'docObjects not found');
      done();
    });

    it('Construction d\'une notice unique (échec : aucun docObjects ayant une source n\'a été trouvé)', (done) => {
      expectError(testData.noDocObjectsWithSource, 'docObjects with source not found');
      done();
    });

    it('Construction d\'une notice unique (échec : aucun docObjects corerspondant à une source n\'a été trouvé)', (done) => {
      expectError(testData.noDocObjectsWithKnownSource, 'docObject corresponding to one of given sources not found');
      done();
    });

    it('Construction d\'une notice unique (échec : aucune priorisation des sources n\'a été trouvée)', (done) => {
      expectError(testData.noPriorities, 'priorities not found');
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation globale)', (done) => {
      expectSuccess(testData.globalPriority, expected.globalPriority);
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation globale + personnalisée)', (done) => {
      expectSuccess(testData.globalAndCustomPriority, expected.globalAndCustomPriority);
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation globale + personnalisée & absence de données)', (done) => {
      expectSuccess(testData.globalAndCustomPriorityButNoData, expected.globalAndCustomPriorityButNoData);
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation globale pour 2 sources identitques & suppression des données non souhaitées)', (done) => {
      expectSuccess(testData.globalPriorityAndDeleteUnwantedData, expected.globalPriorityAndDeleteUnwantedData);
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation conditor -> hal & no fulltext)', (done) => {
      expectSuccess(testData.defaultPrioritiesAndHalWithoutFulltext, expected.defaultPrioritiesAndHalWithoutFulltext);
      done();
    });

    it('Construction d\'une notice unique (succès : priorisation conditor -> hal & fulltext)', (done) => {
      expectSuccess(testData.defaultPrioritiesAndHalWithFulltext, expected.defaultPrioritiesAndHalWithFulltext);
      done();
    });

    it('Construction d\'une notice unique (succès : merge duplicates with idConditor)', (done) => {
      expectSuccess(testData.mergeDuplicates, expected.mergeDuplicates);
      done();
    });

    it('Construction d\'une notice unique (succès : merge duplicates with idConditor case one empty duplicate)', (done) => {
      expectSuccess(testData.mergeDuplicatesWithOneEmptyDuplicate, expected.mergeDuplicatesWithOneEmptyDuplicate);
      done();
    });

    it('Construction d\'une notice unique (succès : merge duplicates with idConditor case one empty duplicate)', (done) => {
      expectSuccess(testData.mergeDuplicatesWithSameDuplicates, expected.mergeDuplicatesWithSameDuplicates);
      done();
    });

    it('Construction d\'une notice unique (succès : merge sourceUid)', (done) => {
      expectSuccess(testData.mergeSourceUid, expected.mergeSourceUid);
      done();
    });

    it('Construction d\'une notice unique (succès : merge sourceUid case same sourceUid)', (done) => {
      expectSuccess(testData.mergeSourceUidButSameSourceUid, expected.mergeSourceUidButSameSourceUid);
      done();
    });

    it('Construction d\'une notice unique (succès : merge enrichments)', (done) => {
      expectSuccess(testData.mergeEnrichments, expected.mergeEnrichments);
      done();
    });

    it('Construction d\'une notice unique (succès : merge keywords)', (done) => {
      expectSuccess(testData.mergeKeywords, expected.mergeKeywords);
      done();
    });

    it('Construction d\'une notice unique (succès : merge orcId)', (done) => {
      expectSuccess(testData.mergeOrcId, expected.mergeOrcId);
      done();
    });
  });
});

/**
 * Runs tests for success cases.
 * @param {object} inputData The input data
 * @param {object} expectedResult The expect result
 */
function expectSuccess (inputData, expectedResult) {
  const result = business.select(inputData.docObjects, inputData.rules, inputData.isConditor);
  expect(result.err).to.be.false;
  expect(result.msg).to.be.equal('success');
  expect(result.res).to.eql(expectedResult);
}

/**
 * Runs tests for error cases.
 * @param {object} inputData The input data
 * @param {string} expectedErrorMessage The expect error message
 */
function expectError (inputData, expectedErrorMessage) {
  const result = business.select(inputData.docObjects, inputData.rules, inputData.isConditor);
  expect(result.err).to.be.true;
  expect(result.msg).to.be.equal(expectedErrorMessage);
  expect(result.res).to.be.undefined;
}
