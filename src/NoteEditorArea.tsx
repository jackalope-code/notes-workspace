import { withAuthenticator } from "@aws-amplify/ui-react";
import { TextField, Typography } from "@mui/material";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { convertToRaw } from "draft-js";
import { ChangeEvent, CSSProperties, useEffect, useMemo, useRef, useState } from "react";
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
    fontSize: "18px"
}

interface NoteEditorProps {
    // textEditorState: EditorState;
    // onEditorStateChange: (state: EditorState) => void;
    // titleChangeHandler: (title: ChangeEvent<HTMLInputElement>) => void;
    // title: string;
    initialNoteId: string;
    sx: CSSProperties;
}

const NoteEditorArea = ({initialNoteId, sx}: NoteEditorProps) => {
    const editorRef = useRef<Editor>(null);
    const [title, setTitle] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
        // conditionally load one actively edited note. load nothing if there is no id set on this component.
        // TODO: check the overall app flow and consider additional checks/validation. add test coverage around this for multiple editors.
        if(noteId !== "") {
            const noteSubscription = DataStore.observeQuery(Note, p => p.id("eq", noteId)).subscribe(snapshot => {
                const {items, isSynced} = snapshot
                console.log("queried and subscribed to note snapshot", snapshot, `synced: ${isSynced}`)
                // set state from the first result
                setEditorStateFromNote(items[0]);
            })

            return () => noteSubscription.unsubscribe();
        }

        focusEditor();
    }, [noteId]);

    useEffect(() => {
        setNoteId(initialNoteId)
        // TODO: clears note state when the note id passed in (in this case from a route) is empty. theres currently no confirm dialog for lost work.
        if(initialNoteId === "") {
            clearEditorState();
        }
    }, [initialNoteId]);

    function clearEditorState() {
        setEditorState(EditorState.createEmpty());
        setTitle("");
    }

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
            // the count of items in the collection the order found from this query would also be
            const lastPlacedNote = (await DataStore.query(Note, Predicates.ALL, {
                sort: note => note.order(SortDirection.DESCENDING),
                limit: 1
            }))[0];
            const lastOrder = lastPlacedNote ? lastPlacedNote.order : 0;
            noteRes = 
                new Note({title, content: serializedText, order: lastOrder+1});
        }
        console.log('constructed note from editor', noteRes);
        return noteRes;
    }

    // TODO: throw error when passed an undefined/invalid note
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
                    // This component changes its own id in state and then blindly navigates to the new url after a save event.
                    setNoteId(note.id);
                    navigate(note.id);
                }
            })
        });
    }
    
    function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }


    // TODO: throttling with note creation and editing
    // const throttledNoteUpdate = useMemo(
    //     () => throttle(createNoteAsync, 3000)
    // , [noteData]);

    
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "10px", ...sx}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <TextField id="notes-title" label="Title" sx={inputStyle} value={title} onChange={titleChangeHandler} variant="standard" size="medium"/>
                <Typography>Last updated field</Typography>
                <Typography>Sync status field</Typography>
            </div>
            {/* <div style={{border: "1px solid black", , display: "block"}} onClick={(e) => handlePageClick(e)} > */}
            <Editor
                wrapperStyle={{flexGrow: "1"}}
                readOnly={readOnly}
                editorState={editorState}
                onEditorStateChange={onEditorChange}
            />
            {/* <div style={{border: "1px solid black", display: "block"}} > */}
                {/* DraftJS plugins */}
                {/* editorRef={editorRef} */}
                {/* plugins={[blockDndPlugin]} */}
            {/* </div> */}
            <button onClick={handleSaveButton}>Save</button>
        </div>
    );
};

export default NoteEditorArea;