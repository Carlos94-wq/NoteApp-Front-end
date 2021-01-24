import React from 'react';

import { NoteForm } from '../Components/NoteForm';
import { NoteList } from '../Components/NoteList';

const NoteScreenStyle = { 
    boxShadow: '0 0 10px rgba(0,0,0,0.21)', 
    padding: '20px', 
    width: '600px', 
    margin: '30px auto' 
}

export const NoteScreen = () => {
    return (
        <div style={NoteScreenStyle}>
           <NoteForm />   
           <NoteList />
        </div>
    )
}
