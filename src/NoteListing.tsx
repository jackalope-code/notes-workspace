import { Card } from "@aws-amplify/ui-react";
import { Dialog } from "@mui/material";
import { DataStore } from "aws-amplify";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Note } from "./models";
import NoteCard from "./NoteCard";
import ReminderCardQuickList from "./ReminderCardQuickList";

// TODO: fix prop drilling
interface NoteListingProps {
    // initialValues: Note[];
    onDelete: (id: string) => void;
}

interface SwappableCard extends Note {
    index: number
}

const NoteListing = ({onDelete}: NoteListingProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  async function fetchNotes() {
    // const res: any = await graphqlCall(listNotes, null, currentSession);
    // setNoteItems(res.data?.listNotes.items);
    async function queryNotes() {
        console.log('attempting to query notes');
        const notes = await DataStore.query(Note);
        setNotes(notes);
    }

    try {
        await queryNotes();
        
    } catch(e) {
        console.log("error", e);
    }
  }

  useEffect(() => {
    fetchNotes();
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
            // <Card
            //   key={card.id}
            //   index={index}
            //   id={card.id}
            //   text={card.text}
            //   moveCard={moveCard}
            // />
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
