import React, { useContext, useReducer, useState } from 'react';
import { NoteContext } from '../Context/NoteContext';
import { NoteTypes } from '../Actions/NoteTypes';
import { FetchData } from '../Helpers/FetchData';

import { Button, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UpdateForm } from './UpdateForm';
import { GetNoteReducer } from '../Reducers/GetNoteReducer';
import { UpdateContext } from '../Context/UpdateContext';

export const NoteList = () => {

    const [modal, setmodal] = useState({visible: false})

    const { Notes, Notedispatch } = useContext(NoteContext);
    const [ Note, Getdispatch] = useReducer(GetNoteReducer, {})

    const handeDelete =( idNota ) => {
        
        const resp = FetchData({
            method: 'DELETE',
            url: `https://localhost:44361/api/Note/${idNota}`
        });
        resp.then(body => body.json())
            .catch( error => console.log(error) )
            .then( Response => {
                if (Response.data) {
                    Notedispatch({
                        type: NoteTypes.DeleteData,
                        payload: idNota
                    })
                }
            })
    }

    const handleShow = (idNota) => {

        const resp = FetchData({
            method: 'GET',
            url: `https://localhost:44361/api/Note/${idNota}`
        });
        resp.then(body => body.json())
            .catch( error => console.log(error) )
            .then( Response => {
               if (Response.data) {
                   Getdispatch({
                       type: NoteTypes.GetNote,
                       payload: Response.data
                   })

                setmodal({
                    visible: !modal.visible
                });
               }
            })

       
    }

    const Columns =[
        { title: 'Titulo', dataIndex: 'titulo' },
        { title: 'Cuerpo', dataIndex: 'cuerpo' },
        { title: 'Fecha de Registro', dataIndex: 'fechaRegistro' },
        { title: 'Prioridad', dataIndex: 'prioridad' },
        { title: 'Action', dataIndex: 'idNota', render: ( id )=> (
            <>
                <Button onClick={ ()=> handeDelete(id) } icon={<DeleteOutlined/>}/>
                <Button onClick={ () => handleShow(id) } icon={<EditOutlined/>}/>
            </>
        )}
    ]

    return (
        <UpdateContext.Provider value={{ Note, Getdispatch }}>
            <Table columns={ Columns } dataSource={Notes}/>
            <Modal visible={ modal.visible } 
                   title="Actualizar Datos" 
                   onCancel={ () => setmodal({visible: !modal.visible}) }
            >
                <UpdateForm modalSate={ setmodal }/>

            </Modal>
        </UpdateContext.Provider>
    )
}
