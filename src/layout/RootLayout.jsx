import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Antd
import { Layout } from 'antd';
import { message } from "antd";

// My Components
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';

// My Custom Hooks
import { useUser } from '@/hooks/auth/useUser';

const { Content, Footer } = Layout;


export default function RootLayout() {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  // if not login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) return <LoadingSpinner />

  if (isAuthenticated) return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />

        <Content className='mx-[16px] my-0 pt-4'>
          {contextHolder}
          <Outlet context={{ openMessage }} />
        </Content>

        <Footer style={{ textAlign: 'center' }}>Skuy Hotels - Anwar Production ©2023 with Ant Design</Footer>
      </Layout>
    </Layout>
  )
}
