import React, { useContext, useEffect } from 'react';

import { Button, Form, Input, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { NoteContext } from '../Context/NoteContext';
import { FetchData } from '../Helpers/FetchData';
import { UpdateContext } from '../Context/UpdateContext';

export const UpdateForm = ({ modalSate }) => {

    const [ form ] = Form.useForm();

    const { GetData  } = useContext(NoteContext);
    const { Note  } = useContext(UpdateContext);

    useEffect(() => {
        form.setFieldsValue({ idNota: Note.idNota })
        form.setFieldsValue({ titulo: Note.titulo })
        form.setFieldsValue({ cuerpo: Note.cuerpo })
        form.setFieldsValue({ idPrioridad: Note.prioridad.idPrioridad })
    }, [Note])

    const hadleUpdate=( values )=>{

        const resp = FetchData({
            method: 'PUT',
            url:'https://localhost:44361/api/Note',
            data: values
        });
        resp.then( body =>body.json() )
            .catch( error =>error )
            .then( Response =>{
                if (Response.data) {
                    GetData();
                    modalSate({visible: false});
                }
            });
    }

    return (
        <Form
                layout="vertical" 
                name="noteform" 
                onFinish={ hadleUpdate }
                form={ form }      
                initialValues ={{
                    titulo: '',
                    cuerpo: '',
                    idPrioridad:''
                }}  
            >
             <Form.Item style ={{display: 'none'}} name="idNota">
                <Input />
            </Form.Item>   

            <Form.Item label="Titulo" name="titulo" rules={[{required: true,message: 'Debes escribir un titulo'}]}>
                <Input />
            </Form.Item>

            <Form.Item label="Cuerpo" name="cuerpo" rules={[{required: true,message: 'Debes escribir un titulo'}]}>
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Prioridad" name="idPrioridad" rules={[{required: true,message: 'Elije una opcion'}]}>
                <Select defaultValue={ 0 }>
                    <Select.Option value={0}>Seleccione una opcion</Select.Option>
                    <Select.Option value={1}>Alta</Select.Option>
                    <Select.Option value={2}>Media</Select.Option>
                    <Select.Option value={3}>Baja</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
               <Button shape="round" type="primary" 
               icon={ <SaveOutlined/> } htmlType="submit" >Actualizar Nota</Button>
            </Form.Item>
        </Form>
    )
}
