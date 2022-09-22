import { FC } from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { user } from 'store';
import { AvatarProps } from './types';

import './styles.css';
import { observer } from 'mobx-react-lite';

export const Avatar: FC<AvatarProps> = observer(
  ({ onClick, src, size = 50 }) => {
    const { name } = user;

    const avatarText = name
      ?.split(' ')
      .map((el) => el[0].toUpperCase())
      .join('');

    return (
      <AntdAvatar src={src} className='avatar' size={size} onClick={onClick}>
        <span className='avatar-text'>{avatarText}</span>
      </AntdAvatar>
    );
  }
);
