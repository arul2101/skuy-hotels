import { useNavigate } from 'react-router-dom';

// Antd
import { Avatar, Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


// Custom Hooks
import { useLogout } from '@/hooks/auth/useLogout';
import { useUser } from '@/hooks/auth/useUser';

// My Components
import LoadingSpinner from '@/components/LoadingSpinner';


export default function Header() {
  const { logout, isPending: isLogout } = useLogout();
  const {
    user: {
      user_metadata: {
        full_name
      }
    }
  } = useUser();

  const navigate = useNavigate();

  const items = [
    {
      label: <button onClick={() => navigate("profile")}>Profile</button>,
      key: '0',
    },
    {
      label: <button onClick={() => logout()} disabled={isLogout}>Logout</button>,
      key: '1',
    }
  ];

  if (isLogout) return <LoadingSpinner />

  return (
    <header className='bg-white py-2 pr-4'>
      <div className='flex justify-end gap-4 items-center'>
        <div>
          {full_name}
        </div>

        <div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
