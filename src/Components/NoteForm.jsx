import React, { useContext } from 'react';

import { Button, Form, Input, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { NoteContext } from '../Context/NoteContext';
import { FetchData } from '../Helpers/FetchData';

export const NoteForm = () => {

    const { GetData } = useContext( NoteContext );

    const [ form ] = Form.useForm();

    const handleFinish = (values) =>{
    
        const resp = FetchData({
            url: 'https://localhost:44361/api/Note',
            method:'POST',
            data: values
        }); 

        resp.then(body => body.json())
        .catch(error => error)
        .then( Response =>{
          if (Response.data) {
            GetData();
            form.resetFields();
          }
        });
    }

    return (
        <Form
                layout="vertical" 
                name="noteform" 
                form={ form } 
                onFinish={ handleFinish }
            
            >
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
               icon={ <SaveOutlined/> } htmlType="submit" >Crear Nota</Button>
            </Form.Item>
        </Form>
    )
}
