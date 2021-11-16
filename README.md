# co-reference
Library to build reference records (or unified records).

## Install
```
npm install co-reference
```

## Prerequisites

### Mapping
Complete the [resources/mapping.json file](./resources/mapping.json).

This JSON file's structure is as follows:
```JSON
{
  "fingerprint": false,
  "idConditor": false,
  "sourceId": false,
  "sourceUid": {
    "action": "merge"
  },
  // ...
  "title": true,
  "title.default": true,
  "title.fr": true,
  "title.en": true,
  "title.meeting": true,
  "title.monography": true,
  "title.journal": true,
  // ...
  "duplicates": {
    "action": "merge",
    "id": "idConditor"
  },
  "nearDuplicates": {
    "action": "merge",
    "id": "idConditor"
  },
  "nearDuplicatesDetectedBySimilarity": {
    "action": "merge",
    "id": "idConditor"
  },
  // ...
  "hasFulltext": false,
  "fulltextPath": false
}
```
This file describes the fields that will be present in the generated reference record.

**Note**: For fields with an array value (`duplicates`, `nearDuplicates` or `nearDuplicatesDetectedBySimilarity`), `co-reference` can merge the data coming from all sources. A property (`idConditor` in the example above) must be used to discriminate the values and remove potential duplicates if the values are objects.

### Rules
Complete the JSON files describing the priority rules (example: [rules/default.json](./rules/default.json)).

This JSON file's structure is as follows:
```JSON
{
  "priorities": [
    "hal",
    "crossref",
    "pubmed",
    "sudoc"
  ],
  "keys": {
    "fingerprint": [/*...*/],
    "idConditor": [/*...*/],
    "sourceId": [/*...*/],
    "sourceUid": [/*...*/],
    // ...
    "title": [/*...*/],
    "title.default": [/*...*/],
    "title.fr": [/*...*/],
    "title.en": [/*...*/],
    "title.meeting": [/*...*/],
    "title.monography": [/*...*/],
    "title.journal": [/*...*/],
    // ...
    "hasFulltext": [/*...*/],
    "fulltextPath": [/*...*/]
  }
}
```

The priority mechanism:
- `priorities` defines the default priority order. It is applied to every field without a specific priority order.
- `keys.<field>` defines a specific priority order for `<field>`. Use an empty array (`[]`) to tell `co-reference` to use the default priority order.

## Usage
This library strictly builds the reference record. It must be integrated in an environment with direct access to the `docObject`s and the JSON file with the rules.

Example:
```JS
const reference = require('co-reference');
const rules = require('./myCustomFile.json');
const docObjects = [{...}, {...}, {...}];

const firstReferenceRecord = reference.select(docObjects, rules);

// With the third parameter set to false (true by default), no verification will be done on the full text of documents coming from Hal.
const secondReferenceRecord = reference.select(docObjects, rules, false);
```

## Example
Considering the following list of documents:
```JSON
[
  {
    "source": "hal",
    "authors": [],
    "abstract": {
      "fr": "abstract.hal.fr",
      "en": "abstract.hal.en"
    }
  },
  {
    "source": "crossref",
    "authors": [
      "authors.crossref.1",
      "authors.crossref.2"
    ],
    "abstract": {
      "fr": "abstract.crossref.fr",
      "en": "abstract.crossref.en"
    }
  },
  {
    "source": "pubmed",
    "authors": [
      "authors.pubmed.1",
      "authors.pubmed.2"
    ],
    "abstract": {
      "fr": "abstract.pubmed.fr",
      "en": "abstract.pubmed.en"
    }
  },
  {
    "source": "sudoc",
    "authors": [
      "authors.sudoc.1",
      "authors.sudoc.2"
    ],
    "abstract": {
      "fr": "abstract.sudoc.fr",
      "en": "abstract.sudoc.en"
    }
  }
]
```
**Note: The `docObject`s used to create the reference record MUST contain a `source` field.**

I want to build a reference record according to the following rules:
- By default, use data coming from "hal", then "crossref", then "pubmed" and finally "sudoc".
- For `abstract.fr`, use data coming from "crossref", then "pubmed" and finally "sudoc".
- For `abstract.en`, use data coming from "pubmed", then "sudoc".

I, thus, use the following JSON file:
```JSON
{
  "priorities": [
    "hal",
    "crossref",
    "pubmed",
    "sudoc"
  ],
  "keys": {
    "authors": [],
    "abstract.fr": [
      "crossref",
      "pubmed",
      "sudoc",
      "hal"
    ],
    "abstract.en": [
      "pubmed",
      "sudoc",
      "crossref",
      "hal"
    ]
  }
}
```

Which will give me the following result:
```JSON
{
  "source": "hal",
  "authors": [
    "authors.crossref.1",
    "authors.crossref.2"
  ],
  "abstract": {
    "fr": "abstract.crossref.fr",
    "en": "abstract.pubmed.en"
  },
  "origins": {
    "authors": "crossref",
    "abstract.fr": "crossref",
    "abstract.en": "pubmed",
    "sources": [
      "hal",
      "crossref",
      "pubmed"
    ]
  }
}
```

Description:
- `source`: the base source
- `origins.<field>`: the source that was modified by `co-reference` for `<field>`
- `origins.sources`: an array compiling all the sources used in the reference record
- If the source on top of the priority list has no data for a field (in our example, the prioritized source (hal) has no `authors`), `co-reference` will go down the priority list until it finds a source with data for this field.
