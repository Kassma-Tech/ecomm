import { Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BASE_URL from '../URL/url';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation } from '../endpoints/userApiSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [refresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector(state => state.auth);
    const [userId, setUserId] = useState('');
    const [userApiSlice] = useDeleteUserMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        BASE_URL.get('/api/v1/user/', {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => setUsers(res.data)).finally(setIsLoading(false))

    }, [refresh])



    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (_id) => (
                <Space size="middle">
                    <Link onClick={() => {
                        confirm();
                        setUserId(_id);
                    }}><DeleteForeverIcon /></Link>
                </Space>
            ),
        },
    ];

    const handleDelete = async () => {

        try {
            const res = await userApiSlice(userId).unwrap();
            refresh ? setIsRefresh(false) : setIsRefresh(true);
            setUserId('');
            setIsModalOpen(false);

        } catch {
            setIsRefresh(true);
            setIsModalOpen(false);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirm = () => {
        Modal.confirm({
            title: "Are you sure want to delete the user?",
            icon: < ExclamationCircleOutlined />,
            open: isModalOpen,
            onOk: handleDelete,
            onCancel: handleCancel,
            okText: "Yes",
            cancelText: "No"
        })
    }
    return (

        isLoading ? <h2>Loading ...</h2>
            : <Table columns={columns} dataSource={users} rowKey='_id' />


    );
}

export default Users;
