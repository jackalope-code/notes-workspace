import NoteEditorArea from "../NoteEditorArea";
import NotesContainer from "../NotesContainer";
import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { Note } from "../models";
import NoteListing from "../NoteListing";
import NotesAppBar from "../NotesAppBar";
import { Link, useParams } from "react-router-dom";
import ConfirmDialog, { useConfirmDialog } from "../ConfirmDialog";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { debounce, throttle } from "lodash";
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography} from "@mui/material";

interface AppBarClippedDrawerProps {
    signOut: (data?: Record<string | number | symbol, any> | undefined) => void;
}

const NotesPage = ({signOut}: AppBarClippedDrawerProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [showDialog, currentId, setDialogOpen, closeDialog] = useConfirmDialog();

    const drawerWidth = 400;


    async function deleteNote(id: string) {
        const noteRef = await DataStore.query(Note, id);
        if(noteRef) {
            await DataStore.delete(noteRef);
        }
    }

    function handleDelete(id: string) {
        setDialogOpen(id);
    }

    async function asyncDelete() {
        await deleteNote(currentId);
    }

    function dialogDelete() {
        asyncDelete();
        closeDialog();
    }


    const params = useParams();
    console.log("note route params", params)
    // function handleNoteLaunched(string)
    

    // Drawer?
    // position: 'relative'
    
    return (
        <Box sx={{display: 'flex', height: "100vh"}}>
            {/* <NotesAppBar /> */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Link to="/"><Typography>Home</Typography></Link>
                    <IconButton component={Link} to="/notes" >
                        <AddIcon color="inherit" />
                    </IconButton>
                    <Link to="/account">Account</Link>
                    <Button color="inherit" onClick={signOut}>Log out</Button>
                </Toolbar>
            </AppBar>
            <Drawer
            variant="permanent"
            open={true}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            >
                {/* AppBar spacing */}
                <Toolbar />
                <DndProvider backend={HTML5Backend}>
                    <NoteListing onDelete={handleDelete}></NoteListing>
                </DndProvider>
                <ConfirmDialog open={showDialog} handleChoiceNo={closeDialog} handleChoiceYes={dialogDelete}/>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1}}>
                {/* TODO: switched routing for note editing here */}
                <Toolbar />
                <NoteEditorArea initialNoteId={params.noteId !== undefined ? params.noteId : ""} />
            </Box>
        </Box>
    );
}

export default NotesPage;