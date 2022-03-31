import { DataStore } from "aws-amplify";
import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react";
import { Note } from "./models";
import NoteCard from "./NoteCard";

// TODO: fix prop drilling
interface NoteListingProps {
    // initialValues: Note[];
    onDelete: (id: string) => void;
}

const NoteListing = ({onDelete}: NoteListingProps) => {
  // TODO: duplicated state also held in datastore. is this necessary for reorderable or can this be refactored?
  const [notes, setNotes] = useState<Note[]>([]);
  // TODO: part of the old ordered note grouping implemention.
  // const [defaultGroup, setDefaultGroup] = useState<NoteGrouping>();

  // TODO: refactor this and make it an observablequery
  // sort by new notes. add to the top. add filtering controls.
  async function fetchNotes() {
    async function queryNotes() {
        const notes = await DataStore.query(Note);
        setNotes(notes);
    }

    try {
        await queryNotes();
        
    } catch(e) {
        console.log("error", e);
    }
  }

  // TODO: part of the old ordered note grouping implemention.
  // async function getDefaultNoteGroup() {
  //   return DataStore.query(NoteGrouping, PredicateAll).then(res => {
  //     console.log('res', res);
  //     return res;
  //   });
  // }

  useEffect(() => {
    // TODO: ordered note grouping implementation. roll into actual organization later after reordering. reconsider the implementation at that time.
    // async function load() {
    //   const groups = await getDefaultNoteGroup();
    //   const tempDefaultVar = groups[0];
    //   setDefaultGroup(tempDefaultVar);
    //   fetchNotes(tempDefaultVar);
    // }

    // load();
    fetchNotes()

  }, []);

  function refreshNotesList() {
    fetchNotes();
  }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setNotes((prevNotes: Note[]) =>
        update(prevNotes, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevNotes[dragIndex] as Note],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (card: Note, index: number) => {
        DataStore.save(
          Note.copyOf(card, updated => {
            updated.order = index;
          })
        );
        return (
          <NoteCard
                key={card.id}
                noteId={card.id}
                index={index}
                title={card.title}
                rawContent={card.content}
                handleDeleteNote={onDelete}
                moveCard={moveCard}
          />
        )
      },
      [],
    )
  
  // TODO: is this ok in render?
  let output;
  if(notes.length === 0) {
    output = <div>No notes</div>;
  } else {
    output = (
    <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "10px"}}>
        <button onClick={refreshNotesList}>List notes</button>
        {notes.map((card, i) => renderCard(card, i))}
    </div>);
  }

  return output;
}

export default NoteListing;
