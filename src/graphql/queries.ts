/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteGrouping = /* GraphQL */ `
  query GetNoteGrouping($id: ID!) {
    getNoteGrouping(id: $id) {
      id
      noteID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      OrderedNotes {
        items {
          id
          title
          content
          sortednotecollectionID
          notegrouID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listNoteGroupings = /* GraphQL */ `
  query ListNoteGroupings(
    $filter: ModelNoteGroupingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteGroupings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        noteID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        OrderedNotes {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNoteGroupings = /* GraphQL */ `
  query SyncNoteGroupings(
    $filter: ModelNoteGroupingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNoteGroupings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        noteID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        OrderedNotes {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
      sortednotecollectionID
      notegrouID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        sortednotecollectionID
        notegrouID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        sortednotecollectionID
        notegrouID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
