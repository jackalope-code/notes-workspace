/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNoteGrouping = /* GraphQL */ `
  subscription OnCreateNoteGrouping {
    onCreateNoteGrouping {
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
export const onUpdateNoteGrouping = /* GraphQL */ `
  subscription OnUpdateNoteGrouping {
    onUpdateNoteGrouping {
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
export const onDeleteNoteGrouping = /* GraphQL */ `
  subscription OnDeleteNoteGrouping {
    onDeleteNoteGrouping {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String) {
    onCreateNote(owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String) {
    onUpdateNote(owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String) {
    onDeleteNote(owner: $owner) {
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
