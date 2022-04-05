import NoteEditorArea from "../NoteEditorArea";
import NotesContainer from "../NotesContainer";
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
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, Button} from "@mui/material";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

interface AppBarClippedDrawerProps {
    signOut: (data?: Record<string | number | symbol, any> | undefined) => void;
}

const NotesPage = ({signOut}: AppBarClippedDrawerProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [showDialog, currentId, setDialogOpen, closeDialog] = useConfirmDialog();
    // TODO: reuse note confirm delete dialog for logout for now
    const [showLogoutDialog, idUnused, openLogoutDialog, closeLogoutDialog] = useConfirmDialog();

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
    
    function handleLogout() {
        const logout = async () => {
            await DataStore.clear();
            signOut();

        }
        logout();
    }

    // Drawer?
    // position: 'relative'
    
    return (
        <Box sx={{display: 'flex'}}>
            {/* <NotesAppBar /> */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Button component={Link} to="/" sx={{color: "white"}}>Home</Button>
                    <IconButton component={Link} to="/notes" >
                        <AddIcon color="inherit" />
                    </IconButton>
                    <Button component={Link} to="/tasks" sx={{color: "white"}}>Tasks and Reminders</Button>
                    <Button component={Link} to="/account" sx={{color: "white"}}>Account</Button>
                    <span style={{color: "white", margin: "10px 0px"}}>Boards</span>
                    <span style={{color: "white", margin: "10px 0px"}}>Sticky notes, interactive shortcuts (from home)</span>
                    <Button color="inherit" onClick={() => openLogoutDialog("")}>Log out</Button>
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
                <DndProvider backend={isMobile ? TouchBackend : HTML5Backend } options={{enableMouseEvents: true}}>
                    <NoteListing onDelete={handleDelete}></NoteListing>
                </DndProvider>
                <ConfirmDialog open={showDialog} handleChoiceNo={closeDialog} handleChoiceYes={dialogDelete} title="Delete note?">
                    Are you sure that you want to delete this note?
                </ConfirmDialog>
                <ConfirmDialog open={showLogoutDialog} handleChoiceNo={closeLogoutDialog} handleChoiceYes={handleLogout} title="Confirm logout">
                    Are you sure you want to log out? You will lose your unsaved note changes.
                </ConfirmDialog>
            </Drawer>
            <Box component="main" sx={{display: "flex", flex: 1}}>
                {/* TODO: switched routing for note editing here */}
                <Toolbar />
                <NoteEditorArea sx={{flex: 1}} initialNoteId={params.noteId !== undefined ? params.noteId : ""} />
            </Box>
        </Box>
    );
}

export default NotesPage;