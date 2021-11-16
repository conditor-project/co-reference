/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { select } = require('../index');

describe('index.js', () => {
  describe('#select()', () => {
    const testData = require('./dataset/in/select');
    const expected = require('./dataset/expected/select');

    it('Fail: no docObjects were found', (done) => {
      expectError(testData.noDocObjects, 'docObjects not found');
      done();
    });

    it('Fail: no docObjects with a source were found', (done) => {
      expectError(testData.noDocObjectsWithSource, 'docObjects with source not found');
      done();
    });

    it('Fail: no docObjects with a known source were found', (done) => {
      expectError(testData.noDocObjectsWithKnownSource, 'docObject corresponding to one of given sources not found');
      done();
    });

    it('Fail: no priorities were found', (done) => {
      expectError(testData.noPriorities, 'priorities not found');
      done();
    });

    it('Success: global priorities)', (done) => {
      expectSuccess(testData.globalPriorities, expected.globalPriorities);
      done();
    });

    it('Success: global and custom priorities', (done) => {
      expectSuccess(testData.globalAndCustomPriorities, expected.globalAndCustomPriorities);
      done();
    });

    it('Success: global and custom priorities but no data', (done) => {
      expectSuccess(testData.globalAndCustomPrioritiesButNoData, expected.globalAndCustomPrioritiesButNoData);
      done();
    });

    it('Success: global priorities for 2 identical sources and and delete unwanted data', (done) => {
      expectSuccess(testData.globalPrioritiesAndDeleteUnwantedData, expected.globalPrioritiesAndDeleteUnwantedData);
      done();
    });

    it('Success: default prorities and Hal without a fulltext', (done) => {
      expectSuccess(testData.defaultPrioritiesAndHalWithoutFulltext, expected.defaultPrioritiesAndHalWithoutFulltext);
      done();
    });

    it('Success: default prorities and Hal with a fulltext', (done) => {
      expectSuccess(testData.defaultPrioritiesAndHalWithFulltext, expected.defaultPrioritiesAndHalWithFulltext);
      done();
    });

    it('Success: merge duplicates with idConditor', (done) => {
      expectSuccess(testData.mergeDuplicates, expected.mergeDuplicates);
      done();
    });

    it('Success: merge duplicates with idConditor (one empty duplicate)', (done) => {
      expectSuccess(testData.mergeDuplicatesWithOneEmptyDuplicate, expected.mergeDuplicatesWithOneEmptyDuplicate);
      done();
    });

    it('Success: merge duplicates with idConditor (identical duplicates)', (done) => {
      expectSuccess(testData.mergeDuplicatesWithSameDuplicates, expected.mergeDuplicatesWithSameDuplicates);
      done();
    });

    it('Success: merge sourceUid', (done) => {
      expectSuccess(testData.mergeSourceUid, expected.mergeSourceUid);
      done();
    });

    it('Success: merge sourceUid (same sourceUid)', (done) => {
      expectSuccess(testData.mergeSourceUidButSameSourceUid, expected.mergeSourceUidButSameSourceUid);
      done();
    });

    it('Success: merge enrichments', (done) => {
      expectSuccess(testData.mergeEnrichments, expected.mergeEnrichments);
      done();
    });

    it('Success: merge keywords', (done) => {
      expectSuccess(testData.mergeKeywords, expected.mergeKeywords);
      done();
    });

    it('Success: merge orcId', (done) => {
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
  const result = select(inputData.docObjects, inputData.rules, inputData.isConditor);
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
  const result = select(inputData.docObjects, inputData.rules, inputData.isConditor);
  expect(result.err).to.be.true;
  expect(result.msg).to.be.equal(expectedErrorMessage);
  expect(result.res).to.be.undefined;
}
