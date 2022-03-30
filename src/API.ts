/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNoteGroupingInput = {
  id?: string | null,
  noteID: string,
  _version?: number | null,
};

export type ModelNoteGroupingConditionInput = {
  noteID?: ModelIDInput | null,
  and?: Array< ModelNoteGroupingConditionInput | null > | null,
  or?: Array< ModelNoteGroupingConditionInput | null > | null,
  not?: ModelNoteGroupingConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type NoteGrouping = {
  __typename: "NoteGrouping",
  id?: string,
  noteID?: string,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
  OrderedNotes?: ModelNoteConnection,
};

export type ModelNoteConnection = {
  __typename: "ModelNoteConnection",
  items?:  Array<Note | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Note = {
  __typename: "Note",
  id?: string,
  title?: string,
  content?: string,
  sortednotecollectionID?: string,
  notegrouID?: string,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateNoteGroupingInput = {
  id: string,
  noteID?: string | null,
  _version?: number | null,
};

export type DeleteNoteGroupingInput = {
  id: string,
  _version?: number | null,
};

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  content: string,
  sortednotecollectionID: string,
  notegrouID: string,
  _version?: number | null,
};

export type ModelNoteConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  sortednotecollectionID?: ModelIDInput | null,
  notegrouID?: ModelIDInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateNoteInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  sortednotecollectionID?: string | null,
  notegrouID?: string | null,
  _version?: number | null,
};

export type DeleteNoteInput = {
  id: string,
  _version?: number | null,
};

export type ModelNoteGroupingFilterInput = {
  id?: ModelIDInput | null,
  noteID?: ModelIDInput | null,
  and?: Array< ModelNoteGroupingFilterInput | null > | null,
  or?: Array< ModelNoteGroupingFilterInput | null > | null,
  not?: ModelNoteGroupingFilterInput | null,
};

export type ModelNoteGroupingConnection = {
  __typename: "ModelNoteGroupingConnection",
  items?:  Array<NoteGrouping | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelNoteFilterInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  sortednotecollectionID?: ModelIDInput | null,
  notegrouID?: ModelIDInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export type CreateNoteGroupingMutationVariables = {
  input?: CreateNoteGroupingInput,
  condition?: ModelNoteGroupingConditionInput | null,
};

export type CreateNoteGroupingMutation = {
  createNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type UpdateNoteGroupingMutationVariables = {
  input?: UpdateNoteGroupingInput,
  condition?: ModelNoteGroupingConditionInput | null,
};

export type UpdateNoteGroupingMutation = {
  updateNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type DeleteNoteGroupingMutationVariables = {
  input?: DeleteNoteGroupingInput,
  condition?: ModelNoteGroupingConditionInput | null,
};

export type DeleteNoteGroupingMutation = {
  deleteNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type CreateNoteMutationVariables = {
  input?: CreateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type CreateNoteMutation = {
  createNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input?: UpdateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type UpdateNoteMutation = {
  updateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input?: DeleteNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type DeleteNoteMutation = {
  deleteNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetNoteGroupingQueryVariables = {
  id?: string,
};

export type GetNoteGroupingQuery = {
  getNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type ListNoteGroupingsQueryVariables = {
  filter?: ModelNoteGroupingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNoteGroupingsQuery = {
  listNoteGroupings?:  {
    __typename: "ModelNoteGroupingConnection",
    items:  Array< {
      __typename: "NoteGrouping",
      id: string,
      noteID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      OrderedNotes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncNoteGroupingsQueryVariables = {
  filter?: ModelNoteGroupingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNoteGroupingsQuery = {
  syncNoteGroupings?:  {
    __typename: "ModelNoteGroupingConnection",
    items:  Array< {
      __typename: "NoteGrouping",
      id: string,
      noteID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      OrderedNotes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetNoteQueryVariables = {
  id?: string,
};

export type GetNoteQuery = {
  getNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      sortednotecollectionID: string,
      notegrouID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNotesQuery = {
  syncNotes?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      sortednotecollectionID: string,
      notegrouID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateNoteGroupingSubscription = {
  onCreateNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnUpdateNoteGroupingSubscription = {
  onUpdateNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnDeleteNoteGroupingSubscription = {
  onDeleteNoteGrouping?:  {
    __typename: "NoteGrouping",
    id: string,
    noteID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    OrderedNotes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        sortednotecollectionID: string,
        notegrouID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnCreateNoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateNoteSubscription = {
  onCreateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateNoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteNoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    sortednotecollectionID: string,
    notegrouID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
