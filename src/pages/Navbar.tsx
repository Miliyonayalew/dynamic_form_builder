import { Layout, Menu, Typography} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

const { Header } = Layout;
const { Title } = Typography

const  Navbar = () => {
  const navigate = useNavigate()

  const onMenuClick = (e: { key: React.Key }) => {
    navigate(e.key.toString());
  };

  return (
    <div className="demo-logo" >
     <Header style={{ display: 'flex', alignItems: 'center'}}>
     <Menu
          style={{ width: '100%' }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          onClick={onMenuClick}
        >
          <Menu.Item key="/" icon={<LeftOutlined />}>
            Home
          </Menu.Item>
        </Menu>
        
      </Header>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Title level={3} className="form-creation">Dynamic Form Builder</Title>
      </div>
    </div>
  )
}

export default Navbar;