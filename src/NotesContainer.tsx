import {Box, Card, CardContent, CardHeader, Drawer, TextField, Toolbar, Typography} from "@mui/material"
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { withAuthenticator} from '@aws-amplify/ui-react';
import { API, Auth, graphqlOperation, Predicates } from "aws-amplify";
import {DataStore} from "@aws-amplify/datastore";
import { getNote, listNotes } from './graphql/queries';
import { createNote, deleteNote } from './graphql/mutations';
import GraphQLAPI, { GraphQLResult } from "@aws-amplify/api-graphql";
import { Note } from "./models";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from "react-draft-wysiwyg";
import NoteListing from "./NoteListing";
import NoteEditorArea from "./NoteEditorArea";
import NotesAppBar from "./NotesAppBar";
import AppBarClippedDrawer from "./AppBarClippedDrawer";

const myTheme = createTheme({
    // Set up your custom MUI theme here
})


const inputStyle = {
    display: "block",
    marginTop: "5px",
    marginBottom: "5px",
};


/* Has component state and app-level controls ()
*/
const NotesContainer = () => {
    const [noteText, setNoteText] = useState("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [currentSession, setCurrentSession] = useState(Auth.currentSession());




    // const editorRef = useRef<Editor>(null);

    // const focusEditor = () => {
    //     if (editorRef.current) {
    //         console.log("focus editor");
    //         (editorRef.current as any).focus();
    //     }
    // };
    



    async function graphqlCall<T extends object>(
        query: string, variables: object | null, authSession: any): 
    Promise<GraphQLResult<T>> {
        const queryString = variables ? graphqlOperation(query, variables) : graphqlOperation(query);
        const asyncGraphQlResult = API.graphql(queryString,
        {accessToken: (await Auth.currentSession()).getAccessToken().getJwtToken()}
        ) as Promise<GraphQLResult<T>>;
        return asyncGraphQlResult;
    }

    function setStringData(data: object) {
        setData(JSON.stringify(data))
    }
    
    function handleDeleteNote() {
    alert("not implemented")
    }
    
    const drawerWidth = 400;
    
    return (
        <ThemeProvider theme={myTheme}>
            <div>
                {/* Start of non containerized app with prop/state deps */}
                {/* <Box sx={{display: "flex"}}>

                </Box> */}
                <AppBarClippedDrawer />
                {/* <Toolbar /> */}
            </div>
        </ThemeProvider>
    )
}

export default withAuthenticator(NotesContainer);