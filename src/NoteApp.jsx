import React, { useEffect, useReducer } from 'react';
import { FetchData } from './Helpers/FetchData';

import { NoteContext } from './Context/NoteContext';
import { NoteReducer } from './Reducers/NoteReducer';
import { NoteScreen } from './Views/NoteScreen';
import { NoteTypes } from './Actions/NoteTypes';

export const NoteApp = () => {

    const [Notes, Notedispatch] = useReducer( NoteReducer , [])

    const GetData = ()=>{
        const resp = FetchData({
            url: 'https://localhost:44361/api/Note',
            method:'GET'
        }); 
        resp.then(body => body.json())
        .catch(error => error)
        .then( Response =>{
            Notedispatch({
                type: NoteTypes.ReadData,
                payload: Response.data
            })
        });
    }

    useEffect(() => {
      GetData();
    }, [])

    return (
       <NoteContext.Provider value={{ Notes, Notedispatch, GetData }}>
           <NoteScreen />
       </NoteContext.Provider>
    )
}
