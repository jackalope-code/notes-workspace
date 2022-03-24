import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import { AppBar, Box, Drawer, Toolbar, Typography, } from "@mui/material";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Note } from "./models";
import NoteEditorArea from "./NoteEditorArea";
import NoteListing from "./NoteListing";
import NotesAppBar from "./NotesAppBar";
import { Link } from "react-router-dom";

interface AppBarClippedDrawerProps {

}

const AppBarClippedDrawer = (props: any) => {
    const [noteItems, setNoteItems] = useState<Note[]>([]);
    console.log('props', props);
    const drawerWidth = 400;

    async function fetchNotes() {
        // const res: any = await graphqlCall(listNotes, null, currentSession);
        // setNoteItems(res.data?.listNotes.items);
        async function queryNotes() {
            console.log('attempting to query notes');
            const notes = await DataStore.query(Note);
            setNoteItems(notes);
        }

        try {
            await queryNotes();
            
        } catch(e) {
            console.log("error", e);
        }
    }

    function refreshNotesList() {
        fetchNotes();
    }

    useEffect(() => {
        // focusEditor();
        fetchNotes();
    }, []);
    
    return (
        <Box>
            {/* <NotesAppBar /> */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Link to="/"><Typography>Home</Typography></Link>
                    <Link to="/edit">
                        {/* <IconButton>
                            <AddIcon color="inherit" />
                        </IconButton> */}
                        <Typography>Notes</Typography>
                    </Link>
                    <Link to="/account">Account</Link>
                    <Button color="inherit">{true ? "Log out" : "Log in"}</Button>
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
                position: 'relative'
                },
            }}
            >
                {/* AppBar spacing */}
                <Toolbar />
                {/* Drawer contents */}
            </Drawer>
        </Box>
    );
}

export default withAuthenticator(AppBarClippedDrawer);