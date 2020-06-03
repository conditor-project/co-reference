# co-reference
Fonctions permettant de construire des notices de référence (ou notice unique)

## Installation ##


```sh
npm i --save co-reference
```

## Prérequis ##

Remplir le fichier [resources/mapping.json](https://github.com/conditor-project/co-reference/blob/master/resources/mapping.json).

La structure de ce fichier est la suivante :

```json
{
  "fingerprint": false,
  "idConditor": false,
  "sourceId": false,
  "sourceUid": false,
  ...
  "title": true,
  "title.default": true,
  "title.fr": true,
  "title.en": true,
  "title.meeting": true,
  "title.monography": true,
  "title.journal": true,
  ...
  "hasFulltext": false,
  "fulltextPath": false
}
```

Ce fichier permet de renseigner quel(s) champ(s) serotn ou non présent dans la notice de référence générée.

Remplir les fichiers JSON contenant les règles de priorités (en s'inspirant du fichier [rules/default.json](https://github.com/conditor-project/co-reference/blob/master/rules/default.json)).

La structure de ce fichier est la suivante :

```json
{
  "priorities": [
    "hal",
    "crossref",
    "pubmed",
    "sudoc"
  ],
  "keys": {
    "fingerprint": [...],
    "idConditor": [...],
    "sourceId": [...],
    "sourceUid": [...],
    ...
    "title": [...],
    "title.default": [...],
    "title.fr": [...],
    "title.en": [...],
    "title.meeting": [...],
    "title.monography": [...],
    "title.journal": [...],
    ...
    "hasFulltext": [...],
    "fulltextPath": [...]
  }
}
```

La propriété :

- "priorities" définie l'ordre de priorité par défaut. Il est appliqué pour toutes les propriétés de la notice de référence (ou notice unique)

- "keys" definie un ordre de priorité différent pour une propriété souhaitée.

## Utilisation ##

Ce "package" permet uniquement de construire la notice de référence (ou notice unique). Il doit être intégré dans un code permettant l'accès au docObjects et aux fichiers "rules" (contenant les ordres de priorités).

Exemple :

```js

const reference = require("co-reference"),
  myRules = require("./myCustomFile.json"), // Lecture du fichier JSON contenant les ordres de priorités
  docObjects = [{...}, {...}, ...]; // Liste des mes docObjects.

const myNoticeUnique = reference.select(docObjects, myRules); // Retourne un objet JSON

// Avec le 3ème paramètre à false (true par défaut), aucune vérification ne sera faite sur le texte intégral des documents hal 
const myNoticeUnique = reference.select(docObjects, myRules, false); // Retourne un objet JSON
```

## Exemple ##

Je dispose de la liste des documents suivants :

```json
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

**Note : les docObjects utilisés pour la création de la notice de référence (ou notice unique) doivent impérativement disposer d'une propriété "source"**

Je souhaite construire une notice de référence (ou notice unique) respectant les règles suivantes :

- Par défaut, prendre en priorité les données de la source : "hal" puis "crossref" puis "pubmed" puis "sudoc"
- Pour "l'abstract fr", prendre en priorité : "crossref" puis "pubmed" puis "sudoc"
- Pour "l'abstract en" prendre en priorité : "pubmed" puis "sudoc"

Je construit donc le fichier JSON suivant :

```json
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

J'obtiendrais le résultat suivant :

```json
{
  "source": "hal",
  "authors": [
    "authors.crossref.1",
    "authors.crossref.2"
  ],
  "abstract": {
    "fr": "abstract.crossref.fr",
    "en":"abstract.pubmed.en"
  },
  "origins": {
    "authors":"crossref",
    "abstract.fr":"crossref",
    "abstract.en":"pubmed",
    "sources":["hal","crossref","pubmed"]
  }
}
```

Notes :

- La propriéte "source" renseigne la source de départ
- La propriéte "origins" renseigne la source pour chaque propriété modifiée par co-reference
- La propriété "origins.sources" contient les différentes sources utilisées pour la création de la notice de référence (ou notice unique)
- En cas d'absence de données (ici : authors), le module vérifiera la présence de données dans les autres sources (selon les priorités définie).
