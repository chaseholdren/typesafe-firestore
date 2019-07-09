# typesafe-firestore

[![npm version](https://badge.fury.io/js/typesafe-firestore.svg)](https://badge.fury.io/js/typesafe-firestore)

A library of typescript interfaces that extend existing firebase classes, adding type safety and a better autocomplete experience.

## Installation

```shell
npm install typesafe-firestore --save-dev
```

## Usage

You most likely want to import `TypedCollectionReference` and create your collections as shown below.

```typescript
import firebase from 'firebase/app';
import 'firebase/firestore';
import { TypedCollectionReference } from 'typesafe-firestore';

interface Author {
  penName: string;
  shortBiography: string;
  posts: string[];
}

const AuthorCollection = firebase.firestore().collection('authors') as TypedCollectionReference<Author>;
```
And then you can use your typesafe collection the same ways you would use the regular firestore library.

```typescript
// OK
AuthorCollection.add({
  penName: '',
  shortBiography: '',
  posts: [],
});

// TS2322: Type 'number' is not assignable to type 'string'.
AuthorCollection.add({
  penName: 11,
  shortBiography: '',
  posts: [],
});

// OK
AuthorCollection.where('penName', '<=', 'Barfunk');

// TS2345: Argument of type '"realName"' is not assignable to parameter of type '"penName" | "shortBiography" | "posts" | FieldPath'.
AuthorCollection.where('realName', '<=', 'Barfunk');


```

### License

typesafe-firestore is [MIT licensed](./LICENSE).
