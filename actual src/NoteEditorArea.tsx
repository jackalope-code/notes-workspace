import { withAuthenticator } from "@aws-amplify/ui-react";
import { TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { convertToRaw } from "draft-js";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertFromRaw} from "draft-js";
import { Note } from "./models";
import {debounce, throttle} from "lodash";
import {useNavigate} from "react-router-dom";

// import Editor from '@draft-js-plugins/editor';
// import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CompareSharp } from "@material-ui/icons";

const inputStyle = {
    display: "block",
    marginTop: "5px",
    marginBottom: "5px",
}

interface NoteEditorProps {
    // textEditorState: EditorState;
    // onEditorStateChange: (state: EditorState) => void;
    // titleChangeHandler: (title: ChangeEvent<HTMLInputElement>) => void;
    // title: string;
    initialNoteId: string
}

const NoteEditorArea = ({initialNoteId}: NoteEditorProps) => {
    const editorRef = useRef<Editor>(null);
    const [title, setTitle] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const [noteData, setNoteData] = useState(new Note({title: "", content: ""}));
    const [readOnly, setReadOnly] = useState(false);
    const [noteId, setNoteId] = useState(initialNoteId);
    const navigate = useNavigate();

    // TODO: do i need to set a readonly flag?
    const onEditorChange = (editorState: EditorState) => {
        setEditorState(editorState);
    }

    const focusEditor = () => {
        console.log("focus editor call", editorRef.current);
        if (editorRef.current) {
            editorRef.current.focusEditor();
        }
    };
    
    useEffect(() => {
        const noteSubscription = DataStore.observeQuery(Note, p => p.id("eq", noteId)).subscribe(snapshot => {
            const {items, isSynced} = snapshot
            console.log("queried and subscribed to note snapshot", snapshot)
            // set state from the first result
            setEditorStateFromNote(items[0]);
        })
        focusEditor();

        return () => noteSubscription.unsubscribe();
    }, [noteId]);

    useEffect(() => {
        setNoteId(initialNoteId)
    }, [initialNoteId]);

    async function createNoteAsync() {
        // await DataStore.save(note)
    }

    function serializeEditorString(state: EditorState) {
        return JSON.stringify(convertToRaw(state.getCurrentContent()));
    }

    function deserializeEditorState(rawDraftEditorString: string): EditorState {
        const editorContent = convertFromRaw(JSON.parse(rawDraftEditorString));
        const editorState = EditorState.createWithContent(editorContent);
        return editorState;
    }

    async function getNoteObjectFromEditor(): Promise<Note> {
        let noteRes;
        const serializedText = serializeEditorString(editorState);
        const oldNote = await DataStore.query(Note, noteId);
        if(oldNote) {
            noteRes = 
                Note.copyOf(oldNote, updated => {
                    updated.title = title;
                    updated.content = serializedText;
                })
        } else {
            noteRes = 
                new Note({title, content: serializedText});
        }

        return noteRes;
    }

    function setEditorStateFromNote(note: Note) {
        setTitle(note.title);
        setReadOnly(true);
        setEditorState(deserializeEditorState(note.content));
        setReadOnly(false);
    }

    function handleSaveButton() {
        getNoteObjectFromEditor().then(note => {
            DataStore.save(note).then(() => {
                if(noteId !== note.id) {
                    // Do I really need to set the note id anymore? this is kind of weird regardless bc i have mixed state
                    // from this stateful component and the one above it that is doing id/routing. state could probably
                    // get split up better to make some of these components less confusing.

                    // I have mixed state from the component getting a note id as a prop, then managing its own id, but also getting
                    // redirected and then changed from props again from the note id component. confusing.
                    setNoteId(note.id);
                    navigate(note.id)
                }
            })
        });
    }
    
    function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    // commented out click event
    // function handlePageClick(event: any) {
    //     console.log('click event', event);
    // }

    // const blockDndPlugin = createBlockDndPlugin();


    // TODO: throttling with note creation and editing
    // const throttledNoteUpdate = useMemo(
    //     () => throttle(createNoteAsync, 3000)
    // , [noteData]);

    
    return (
        <div>
            <TextField id="notes-title" label="Title" sx={inputStyle} value={title} onChange={titleChangeHandler}></TextField>
            {/* <div style={{border: "1px solid black", height: "100vh", display: "block"}} onClick={(e) => handlePageClick(e)} > */}
            <div style={{border: "1px solid black", height: "100vh", display: "block"}} >
                <Editor
                    readOnly={readOnly}
                    editorState={editorState}
                    onEditorStateChange={onEditorChange}
                />
                {/* DraftJS plugins */}
                {/* editorRef={editorRef} */}
                {/* plugins={[blockDndPlugin]} */}
            </div>
                <button onClick={handleSaveButton}>Save</button>
        </div>
    );
};

export default NoteEditorArea;