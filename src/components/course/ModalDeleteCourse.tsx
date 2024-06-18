import { Flex, Modal, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { courseUrl } from '../../util/course'
interface Prop {
    close: () => void
    open: boolean
    name: string
    id: number
    ondelete: (id: number) => void

}

const ModalDeleteCourse = ({ close, open, id, name, ondelete }: Prop) => {


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const deleteData = () => {
        axios.delete(courseUrl + `/${id}`).then(() => { success(), ondelete(id) }).catch();
    }
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
            <Modal
                open={open}
                onCancel={close}
                onOk={deleteData}
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

export default ModalDeleteCourse;