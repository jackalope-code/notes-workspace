import { CardContentProps } from "@material-ui/core";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { Note } from "./models";
import "./card.css";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from "react";
import type { XYCoord, Identifier } from 'dnd-core'
import { NumericDictionaryIteratee } from "lodash";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CardHeader, CardContent, Typography, CardActions, Box, IconButton, Modal, Card, CardActionArea } from "@mui/material";

// handleEditNote: (id: string, data: Note) => void;
interface NoteCardProps {
    noteId: string;
    title: string;
    rawContent: string;
    handleDeleteNote: (id: string) => void;
    moveCard: (dragIndex: number, hoverIndex: number, isDragging: boolean) => void;
    index: number;
}

const ItemTypes = {
    CARD: "card"
};

interface DragItem {
    index: number
    id: string
    type: string
  }

  //{ id, text, index, moveCard }
const NoteCard = ({noteId, title, rawContent, handleDeleteNote, moveCard, index}: NoteCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        }
        },
        hover(item: DragItem, monitor) {
        if (!ref.current) {
            return
        }
        const dragIndex = item.index
        const hoverIndex = index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex, isDragging)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
        return { noteId, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    let cardContent;
    try {
        const editorContent = convertFromRaw(JSON.parse(rawContent))
        cardContent = <Editor editorState={EditorState.createWithContent(editorContent)} readOnly={true} onChange={(state) => {return}}/>
    } catch(error) {
        cardContent = rawContent;
    }

    // onClick={() => handleOpenNote(id)
    drag(drop(ref));
    return (
        // <Card className="note-card" variation="outlined">
        //sx={{height: "300px", display: "flex", flexDirection: "column"}}
        <Card ref={ref} className="note-card" variant="outlined" sx={{minHeight: "300px", "&:hover": {background: "#aacccc"}}}>
            <CardActionArea component={Link} to={`/notes/${noteId}`}>
                <CardHeader title={title}></CardHeader>
                <CardContent className="card-contents" style={{overflow: "hidden", textOverflow: "ellipsis", overflowWrap: "anywhere"}}>
                    {cardContent}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => handleDeleteNote(noteId)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default NoteCard;