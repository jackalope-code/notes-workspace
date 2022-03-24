import { withAuthenticator } from "@aws-amplify/ui-react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotesAppBar = (props: any) => {
    console.log('notes app bar renderd. props:', props);
    return (
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Link to="/"><Typography>Home</Typography></Link>
                <Link to="/notes">Notes</Link>
                <Link to="/account">Account</Link>
                <Button color="inherit">{true ? "Log out" : "Log in"}</Button>
            </Toolbar>
        </AppBar>
    );
}

export default withAuthenticator(NotesAppBar);