import { withAuthenticator } from "@aws-amplify/ui-react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
    signOut: (data?: Record<string | number | symbol, any> | undefined) => void;
}
const NotesAppBar = ({signOut}: Props) => {
    return (
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Link to="/"><Typography>Home</Typography></Link>
                <Link to="/notes">Notes</Link>
                <Link to="/account">Account</Link>
                <Button color="inherit" onClick={signOut}>Log out</Button>
            </Toolbar>
        </AppBar>
    );
}

export default withAuthenticator(NotesAppBar);