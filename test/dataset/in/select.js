const noDocObjects = {
  docObjects: [],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const noDocObjectsWithSource = {
  docObjects: [
    {
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
      abstract: {
        fr: 'abstract.custom.fr',
        en: 'abstract.custom.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const noDocObjectsWithKnownSource = {
  docObjects: [
    {
      source: 'custom',
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
      abstract: {
        fr: 'abstract.custom.fr',
        en: 'abstract.custom.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const noPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
    },
  ],
  rules: {
    priorities: [],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const globalPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [],
      'abstract.en': [],
    },
  },
  isConditor: false,
};

const globalAndCustomPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const globalAndCustomPrioritiesButNoData = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const globalPrioritiesAndDeleteUnwantedData = {
  docObjects: [
    {
      idConditor: 'hal1',
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      idConditor: 'hal2',
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
  isConditor: false,
};

const defaultPrioritiesAndHalWithoutFulltext = {
  docObjects: [
    {
      idConditor: 'hal',
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: false,
    },
    {
      idConditor: 'crossref',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const defaultPrioritiesAndHalWithFulltext = {
  docObjects: [
    {
      idConditor: 'hal',
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const mergeDuplicates = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'crossref:crossref1',
          source: 'crossref',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      duplicates: [
        {
          idConditor: 'hal:hal1',
          source: 'hal',
        },
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'crossref:crossref1',
          source: 'crossref',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      duplicates: [
        {
          idConditor: 'hal:hal1',
          source: 'hal',
        },
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      idConditor: 'sudoc:sudoc1',
      source: 'sudoc',
      authors: [],
      duplicates: [],
      abstract: {},
    },
  ],
  isConditor: true,
};

const mergeDuplicatesWithSameDuplicates = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'sudoc:sudoc1',
          source: 'sudoc',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      duplicates: [
        {
          idConditor: 'sudoc:sudoc1',
          source: 'sudoc',
        },
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const mergeSourceUid = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'crossref:crossref1',
          source: 'crossref',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref:crossref1',
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      duplicates: [
        {
          idConditor: 'hal:hal1',
          source: 'hal',
        },
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const mergeSourceUidButSameSourceUid = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'crossref:crossref1',
          source: 'crossref',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'hal:hal1',
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      duplicates: [
        {
          idConditor: 'crossref:crossref1',
          source: 'crossref',
        },
      ],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      hasFulltext: true,
    },
    {
      idConditor: 'crossref:crossref1',
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      duplicates: [
        {
          idConditor: 'hal:hal1',
          source: 'hal',
        },
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
  isConditor: true,
};

const mergeEnrichments = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      sourceUid: 'hal:hal1',
      source: 'hal',
      enrichments: {
        oa: {
          unpaywall: ['hal'],
          core: ['hal'],
        },
        classifications: {
          scopus: [
            {
              level: 1,
              label: 'hal',
            },
          ],
          scienceMetrix: [
            {
              level: 1,
              label: 'hal',
            },
          ],
        },
      },
    },
    {
      idConditor: 'crossref:crossref1',
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      enrichments: {
        oa: {
          unpaywall: [
            'crossref',
          ],
          core: [
            'crossref',
          ],
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
    },
  ],
  isConditor: true,
};

const mergeKeywords = {
  docObjects: [
    {
      idConditor: 'hal:hal1',
      sourceUid: 'hal:hal1',
      source: 'hal',
      enrichments: {
        oa: {
          unpaywall: ['hal'],
          core: ['hal'],
        },
      },
      keywords: {
        fr: {
          author: ['test1', 'test2'],
        },
      },
    },
    {
      idConditor: 'crossref:crossref1',
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      enrichments: {
        oa: {
          unpaywall: ['crossref'],
          core: ['crossref'],
        },
      },
      keywords: {
        fr: {
          author: ['test2', 'test3'],
        },
      },
    },
  ],
  isConditor: true,
};

const mergeOrcId = {
  docObjects: [
    {
      idConditor: 'pubmed:pubmed1',
      sourceUid: 'pubmed:pubmed1',
      source: 'pubmed',
      authors: [
        {
          forename: 'Gérard ',
          surname: ' André',
        },
        {
          forename: ' Lea',
          surname: 'De Marche ',
          orcId: '0000-0003-4093-3000',
        },
        {
          forename: 'Charles',
        },
      ],
    },
    {
      idConditor: 'crossref:crossref1',
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        {
          forename: ' Gerard',
          surname: 'Andre ',
          enrichments: {
            orcId: '0000-0003-3946-1982',
          },
        },
        {
          forename: 'Léa ',
          surname: ' De Marché',
        },
        {
          forename: 'Charles',
          surname: 'Attend',
          orcId: '0000-0003-4236-2015',
        },
      ],
    },
  ],
  isConditor: true,
};

module.exports = {
  noDocObjects,
  noDocObjectsWithSource,
  noDocObjectsWithKnownSource,
  noPriorities,
  globalPriorities,
  globalAndCustomPriorities,
  globalAndCustomPrioritiesButNoData,
  globalPrioritiesAndDeleteUnwantedData,
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
