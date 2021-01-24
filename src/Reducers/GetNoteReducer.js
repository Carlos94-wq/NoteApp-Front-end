import { NoteTypes } from "../Actions/NoteTypes";

export const GetNoteReducer = ( state = {}, action ) => {
    switch (action.type) {
        case NoteTypes.GetNote:
            
            return action.payload;
    
        default:
            return state;
    }
}