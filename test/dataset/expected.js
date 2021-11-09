const globalPriority = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  source: 'hal',
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.hal.en' },
  origins: {
    authors: 'hal',
    source: 'hal',
    abstract: 'hal',
    'abstract.fr': 'hal',
    'abstract.en': 'hal',
    sources: ['hal'],
  },
};

const globalAndCustomPriority = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  source: 'hal',
  abstract: {
    fr: 'abstract.crossref.fr',
    en: 'abstract.pubmed.en',
  },
  origins: {
    authors: 'hal',
    source: 'hal',
    abstract: 'hal',
    'abstract.fr': 'crossref',
    'abstract.en': 'pubmed',
    sources: ['hal', 'crossref', 'pubmed'],
  },
};

const globalAndCustomPriorityButNoData = {
  source: 'hal',
  abstract: { fr: 'abstract.crossref.fr', en: 'abstract.pubmed.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    source: 'hal',
    abstract: 'hal',
    'abstract.fr': 'crossref',
    'abstract.en': 'pubmed',
    authors: 'crossref',
    sources: ['hal', 'crossref', 'pubmed'],
  },
};

const globalPriorityAndDeleteUnwantedData = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  source: 'hal',
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.hal.en' },
  origins: {
    authors: 'hal',
    source: 'hal',
    abstract: 'hal',
    'abstract.fr': 'hal',
    'abstract.en': 'hal',
    sources: ['hal'],
  },
};

const defaultPrioritiesAndHalWithoutFulltext = {
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  source: 'crossref',
  abstract: { fr: 'abstract.crossref.fr', en: 'abstract.crossref.en' },
  origins: {
    authors: 'crossref',
    source: 'crossref',
    abstract: 'crossref',
    'abstract.fr': 'crossref',
    'abstract.en': 'crossref',
    sources: ['crossref'],
  },
};

const defaultPrioritiesAndHalWithFulltext = {
  source: 'hal',
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    source: 'hal',
    abstract: 'hal',
    'abstract.fr': 'hal',
    authors: 'crossref',
    'abstract.en': 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeDuplicates = {
  source: 'hal',
  duplicates: [
    { idConditor: 'crossref:crossref1', source: 'crossref' },
    { idConditor: 'hal:hal1', source: 'hal' },
  ],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    source: 'hal',
    duplicates: ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  source: 'hal',
  duplicates: [
    { idConditor: 'crossref:crossref1', source: 'crossref' },
    { idConditor: 'hal:hal1', source: 'hal' },
  ],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    source: 'hal',
    duplicates: ['hal', 'crossref', 'sudoc'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref', 'sudoc'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeDuplicatesWithSameDuplicates = {
  source: 'hal',
  duplicates: [{ idConditor: 'sudoc:sudoc1', source: 'sudoc' }],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    source: 'hal',
    duplicates: ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeSourceUid = {
  sourceUid: ['hal:hal1', 'crossref:crossref1'],
  source: 'hal',
  duplicates: [
    { idConditor: 'crossref:crossref1', source: 'crossref' },
    { idConditor: 'hal:hal1', source: 'hal' },
  ],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    sourceUid: ['hal', 'crossref'],
    source: 'hal',
    duplicates: ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeSourceUidButSameSourceUid = {
  sourceUid: ['hal:hal1', 'crossref:crossref1'],
  source: 'hal',
  duplicates: [
    { idConditor: 'crossref:crossref1', source: 'crossref' },
    { idConditor: 'hal:hal1', source: 'hal' },
  ],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    sourceUid: ['hal', 'crossref'],
    source: 'hal',
    duplicates: ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeEnrichments = {
  sourceUid: ['hal:hal1', 'crossref:crossref1'],
  source: 'crossref',
  enrichments: {
    oa: {
      unpaywall: ['crossref'],
      core: ['crossref'],
    },
    classifications: {
      scopus: [
        {
          level: 1,
          label: 'crossref',
        },
      ],
      scienceMetrix: [
        {
          level: 1,
          label: 'crossref',
        },
      ],
    },
  },
  origins: {
    sourceUid: ['hal', 'crossref'],
    source: 'crossref',
    enrichments: 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeKeywords = {
  sourceUid: ['hal:hal1', 'crossref:crossref1'],
  source: 'crossref',
  enrichments: {
    oa: {
      unpaywall: ['crossref'],
      core: ['crossref'],
    },
  },
  keywords: {
    fr: {
      author: ['test1', 'test2', 'test3'],
    },
  },
  origins: {
    sourceUid: ['hal', 'crossref'],
    source: 'crossref',
    enrichments: 'crossref',
    'keywords.fr.author': ['hal', 'crossref'],
    sources: ['hal', 'crossref'],
  },
};

const mergeOrcId = {
  sourceUid: ['pubmed:pubmed1', 'crossref:crossref1'],
  authors: [
    {
      forename: 'Gérard ',
      surname: ' André',
      orcId: '0000-0003-3946-1982',
    },
    {
      forename: ' Lea',
      surname: 'De Marche ',
      orcId: '0000-0003-4093-3000',
    },
    { forename: 'Charles' },
  ],
  source: 'pubmed',
  origins: {
    sourceUid: ['pubmed', 'crossref'],
    authors: 'pubmed',
    source: 'pubmed',
    sources: ['pubmed', 'crossref'],
  },
};

module.exports = {
  globalPriority,
  globalAndCustomPriority,
  globalAndCustomPriorityButNoData,
  globalPriorityAndDeleteUnwantedData,
  defaultPrioritiesAndHalWithoutFulltext,
  defaultPrioritiesAndHalWithFulltext,
  mergeDuplicates,
  mergeDuplicatesWithOneEmptyDuplicate,
  mergeDuplicatesWithSameDuplicates,
  mergeSourceUid,
  mergeSourceUidButSameSourceUid,
  mergeEnrichments,
  mergeKeywords,
  mergeOrcId,
};
