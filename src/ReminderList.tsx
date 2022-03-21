import { List, ListItem, ListItemText } from "@material-ui/core";

const ReminderList = () => {
    return (
        <List>
            <ListItem>
                <ListItemText primary="single line item"/>
            </ListItem>
        </List>
    )
}

export default ReminderList;