import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import avatar from '../assets/Image/user.png'
import styled from 'styled-components';
import { useGetCurrentUserQuery } from '../endpoints/userApiSlice';
import { Link } from 'react-router-dom'
const { Meta } = Card;


const Profile = () => {

    const { data: currentUser, isLoading } = useGetCurrentUserQuery();

    return <Wrapper>
        {
            isLoading ? <h1>Loading ...</h1>
                : <Card
                    style={{
                        width: 500,
                    }}
                    cover={
                        <img
                            alt="example"
                            src={avatar}
                        />
                    }
                    actions={[

                        <Link to='/update-password'>
                            <SettingOutlined key="setting" />
                        </Link>,
                        <Link to='/update-user'>
                            <EditOutlined key="edit" />
                        </Link>,
                        <EllipsisOutlined key="ellipsis" />
                    ]}
                >
                    <Meta
                        avatar={<Avatar src={avatar} />}
                        title={currentUser?.email}
                        description={<h1>Role: {currentUser.role}</h1>}
                    />
                </Card>
        }

    </Wrapper>
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
   width: 400px;
   height: 80vh;
   margin: 0 auto;
`
export default Profile;