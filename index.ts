import firebase from "firebase/app";

export interface TypedDocumentData<T extends firebase.firestore.DocumentData>
  extends firebase.firestore.DocumentData {
  [field: string]: T;
}

export interface TypedDocumentReference<
  T extends firebase.firestore.DocumentData
> extends firebase.firestore.DocumentReference {
  readonly parent: TypedCollectionReference<T>;
  readonly path: string;

  collection(collectionPath: string): TypedCollectionReference<T>;

  isEqual(other: TypedDocumentReference<T>): boolean;

  set(data: T, options?: firebase.firestore.SetOptions): Promise<void>;

  update(data: Partial<T>): Promise<void>;

  update(
    field: keyof T | firebase.firestore.FieldPath,
    value: T[keyof T],
    ...moreFieldsAndValues: (T[keyof T])[]
  ): Promise<void>;

  delete(): Promise<void>;

  get(
    options?: firebase.firestore.GetOptions
  ): Promise<TypedDocumentSnapshot<T>>;

  onSnapshot(observer: {
    next?: (snapshot: TypedDocumentSnapshot<T>) => void;
    error?: (error: firebase.firestore.FirestoreError) => void;
    complete?: () => void;
  }): () => void;

  onSnapshot(
    options: firebase.firestore.SnapshotListenOptions,
    observer: {
      next?: (snapshot: TypedDocumentSnapshot<T>) => void;
      error?: (error: Error) => void;
      complete?: () => void;
    }
  ): () => void;

  onSnapshot(
    onNext: (snapshot: TypedDocumentSnapshot<T>) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;

  onSnapshot(
    options: firebase.firestore.SnapshotListenOptions,
    onNext: (snapshot: TypedDocumentSnapshot<T>) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface TypedDocumentSnapshot<
  T extends firebase.firestore.DocumentData
> extends firebase.firestore.DocumentSnapshot {
  data(options?: firebase.firestore.SnapshotOptions): T | undefined;
}

export interface TypedQuery<T extends TypedDocumentData<T>>
  extends firebase.firestore.Query {
  get(options?: firebase.firestore.GetOptions): Promise<TypedQuerySnapshot<T>>;

  where(
    fieldPath: keyof T | firebase.firestore.FieldPath,
    opStr: firebase.firestore.WhereFilterOp,
    value: T[keyof T]
  ): TypedQuery<T>;
}

export interface TypedQueryDocumentSnapshot<
  T extends firebase.firestore.DocumentData
> extends firebase.firestore.QueryDocumentSnapshot {
  data(options?: firebase.firestore.SnapshotOptions): T;
}

export interface TypedQuerySnapshot<T extends firebase.firestore.DocumentData>
  extends firebase.firestore.QuerySnapshot {
  docs: TypedQueryDocumentSnapshot<T>[];
}

export interface TypedCollectionReference<
  T extends firebase.firestore.DocumentData
> extends firebase.firestore.CollectionReference {
  get(options?: firebase.firestore.GetOptions): Promise<TypedQuerySnapshot<T>>;

  where(
    fieldPath: keyof T | firebase.firestore.FieldPath,
    opStr: firebase.firestore.WhereFilterOp,
    value: T[keyof T]
  ): TypedQuery<T>;

  doc(documentPath?: string): TypedDocumentReference<T>;

  add(data: T): Promise<TypedDocumentReference<T>>;
}
