import { DataStore, Predicates, SortDirection } from "aws-amplify";
import update from 'immutability-helper'
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { Note } from "./models";
import NoteCard from "./NoteCard";
import notes from "./routes/notes";

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

    // DataStore.query(Note, Predicates.ALL, {
    //   sort: s => s.order(SortDirection.ASCENDING)
    // }).then(items => {
    //   console.log("loaded notes from query", items);
    //   setNotes(items)
    // });

      // sort by new notes. add to the top. add filtering controls. add folders for organization.
    const allNotesSubscription = DataStore.observeQuery(Note, Predicates.ALL, {
      sort: s => s.order(SortDirection.ASCENDING)
    }).subscribe(snapshot => {
      const {items, isSynced} = snapshot;
      setNotes(items);
    });

    return () => allNotesSubscription.unsubscribe();

  }, []);

  const debouncedNoteDragUpdate = useCallback(
    (selectedNote: Note, index: number) => {debounce(async () => {
      try {
        await DataStore.save(
          Note.copyOf(selectedNote, updated => {
            updated.order = index;
          })
        );
      } catch (e) {
        console.error("Error updating draggable card order on AWS Datastore.")
      }
    }, 250)}, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number, isDragging: boolean) => {
    setNotes((prevNotes: Note[]) => {
      // TODO: add a limiter?
      try {
        if(!isDragging) {
          console.log("SAVING", prevNotes[dragIndex]);
          DataStore.save(
            Note.copyOf(prevNotes[dragIndex], updated => {
              updated.order = dragIndex;
            })
          );
        } else {
          console.log("dragging...");
        }
        // debouncedNoteDragUpdate(prevNotes[dragIndex], dragIndex);
      } catch (e) {
        console.error("Error updating draggable card order on AWS Datastore.")
      }
      return update(prevNotes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevNotes[dragIndex] as Note],
        ],
      })
    })
  }, [])
  
  const renderCard = useCallback(
    (card: Note, index: number) => {
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
        {/* <button onClick={refreshNotesList}>List notes</button> */}
        {notes.map((card, i) => renderCard(card, i))}
    </div>);
  }

  // allow vertical scrolling
  const options = {
    scrollAngleRanges: [
      { start: 30, end: 150 },
      { start: 210, end: 330 }
    ]
  }

  return output;
}

export default NoteListing;
