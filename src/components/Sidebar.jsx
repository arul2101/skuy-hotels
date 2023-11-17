import { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined
} from '@ant-design/icons';
import Logo from '@/components/Logo';
import { NavLink, useLocation } from 'react-router-dom';

const { Sider } = Layout;

function getItem(
  label,
  key,
  icon,
  children,
) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem(<NavLink to="/dashboard">Dashboard</NavLink>, '1', <DashboardOutlined />,),
  getItem(<NavLink to="/bookings">Bookings</NavLink>, "3", <BookOutlined />),
  getItem(<NavLink to="/cabins">Cabins</NavLink>, '2', <HomeOutlined />),
  getItem(<NavLink to="/users">Users</NavLink>, "4", <TeamOutlined />)
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const result = items.filter((item) => {
    return item?.label.props.to === location.pathname
  })

  const currentIndex = result[0]?.key;


  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Logo />
      <Menu
        theme="dark"
        defaultSelectedKeys={[`${currentIndex}`]}
        selectedKeys={[`${currentIndex}`]}
        mode="inline"
        items={items} />
    </Sider>
  )
}
