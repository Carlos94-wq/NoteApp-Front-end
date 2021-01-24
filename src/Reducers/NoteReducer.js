import { NoteTypes } from "../Actions/NoteTypes";

export const NoteReducer = ( state = [], action ) => {
    switch ( action.type ) {
        
        case NoteTypes.ReadData:

            return action.payload
    
        case NoteTypes.DeleteData:
            return state.filter( state => state.idNota !== action.payload );

        default:
            return state;
    }
}