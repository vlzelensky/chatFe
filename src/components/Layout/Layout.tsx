import { FC, useState } from 'react';
import { Button, Layout as AntdLayout, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { user } from 'store';
import { LayoutProps } from './types';
import logo from 'public/images/logo.png';

import './styles.scss';

const { Header, Sider, Content } = AntdLayout;

export const Layout: FC<LayoutProps> = observer(({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const navigate = useNavigate();

  const {
    info: { name, userName, avatar },
  } = user;

  const avatarText = name
    ?.split(' ')
    .map((el) => el[0].toUpperCase())
    .join('');

  return (
    <AntdLayout className='layout'>
      <Header className='header'>
        <img className='logo' src={logo} alt='logo' />
        <div>
          <span className='user-name' onClick={() => navigate('/profile')}>
            {name}
          </span>
          <Button className='header-button' onClick={() => user.logout()}>
            Выйти
          </Button>
        </div>
      </Header>
      <AntdLayout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className='sider-container'>
            <div className='conversations-wrapper'>
              {/* Todo здесь будет список активных диалогов */}
              {!collapsed && [].map(({ id, userName }) => <div key={id}>{userName}</div>)}
            </div>
            <div className='avatar-wrapper'>
              {!collapsed && <span className='user-name with-margin'>{userName}</span>}
              <Avatar
                src={avatar || ''}
                className='avatar'
                size={50}
                onClick={() => navigate('/profile')}
              >
                {!avatar && avatarText}
              </Avatar>
            </div>
          </div>
        </Sider>
        <Content>{children}</Content>
      </AntdLayout>
    </AntdLayout>
  );
});
