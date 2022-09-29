import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoComplete, Spin } from 'antd';
import { useDebounce } from 'hooks';
import { findUser } from 'api';
import { user } from 'store';
import { User } from './types';

import './styles.scss';

export const Search: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<null | User[]>(null);
  const debouncedSearch = useDebounce(inputValue, 1000);
  const navigate = useNavigate();

  const openConversation = (value: string) => {
    const user = users?.find(({ userName }) => userName === value);
    if (user) {
      navigate(`/conversation/${user.id}`);
    }
  };

  useEffect(() => {
    if (debouncedSearch && inputValue.length > 2) {
      setIsLoading(true);
      findUser(inputValue, user.id!).then(({ data: { users } }) => {
        setIsLoading(false);
        setUsers(users);
      });
    } else {
      setIsLoading(false);
      if (users) {
        setUsers(null);
      }
    }
  }, [debouncedSearch]);

  const options = useMemo(() => {
    return users?.map((user: User) => ({
      value: user.userName,
      ...user,
    }));
  }, [users]);

  return (
    <div className='search-wrapper'>
      <AutoComplete
        className='search'
        options={options}
        value={inputValue}
        onChange={(value: string) => setInputValue(value)}
        onSelect={(value: string) => openConversation(value)}
      />
      <Spin spinning={isLoading} />
    </div>
  );
};
