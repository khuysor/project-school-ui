import React, { useState } from 'react';
import { Button, Flex, Modal, Space, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { urlStu } from '../util/student';
interface Prop {
    close: () => void
    open: boolean
    name: string
    id: number
    ondelete: (id: number) => void

}

const ModalDeleteStudent = ({ close, open, id, name, ondelete }: Prop) => {
    const url = urlStu + `/${id}`;
    const deleteStudent = () => {
        axios.delete(`${url}`).then(() => { success(), close(); ondelete(id) }).catch((e) => console.log(e))

    }
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
            <Modal
                open={open}
                onOk={deleteStudent}
                onCancel={close}
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <InfoCircleOutlined style={{ color: 'red' }} />
                        <span style={{ fontSize: 18, color: 'red' }}>Are you sure  to delete </span>
                    </div>
                }

            >
                {contextHolder}
                <Flex justify={'center'} style={{ height: 100, marginTop: '15%' }}>
                    <h1 style={{ fontSize: '18' }}>{name} ?</h1>
                </Flex>
            </Modal>
        </>
    );
};

export default ModalDeleteStudent;