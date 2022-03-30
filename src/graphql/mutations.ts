/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNoteGrouping = /* GraphQL */ `
  mutation CreateNoteGrouping(
    $input: CreateNoteGroupingInput!
    $condition: ModelNoteGroupingConditionInput
  ) {
    createNoteGrouping(input: $input, condition: $condition) {
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
export const updateNoteGrouping = /* GraphQL */ `
  mutation UpdateNoteGrouping(
    $input: UpdateNoteGroupingInput!
    $condition: ModelNoteGroupingConditionInput
  ) {
    updateNoteGrouping(input: $input, condition: $condition) {
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
export const deleteNoteGrouping = /* GraphQL */ `
  mutation DeleteNoteGrouping(
    $input: DeleteNoteGroupingInput!
    $condition: ModelNoteGroupingConditionInput
  ) {
    deleteNoteGrouping(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
