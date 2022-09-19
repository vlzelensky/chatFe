import { FC } from 'react';
import { Form as AntdForm, Input, Button, DatePicker, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from 'api';
import { RegisterUserDataI } from 'api/types';
import { user } from 'store/user';
import { FormProps } from './types';
import {
  validatePassword,
  validateRepeatPassword,
  validateUserName,
} from './validators';

import './styles.css';

export const Form: FC<FormProps> = ({ title, mode }) => {
  const navigate = useNavigate();

  const isSignUp = mode === 'signup';

  const onFinish = async ({
    email,
    password,
    name,
    userName,
    birthDate,
  }: RegisterUserDataI) => {
    if (isSignUp) {
      const errorMessage = await registerUser({
        email,
        userName,
        name,
        password,
        birthDate,
      });
      if (errorMessage && typeof errorMessage === 'string') {
        message.error(errorMessage);
        return;
      }
      message.success('Вы успешно зарегистрированы');
      setTimeout(() => navigate('/signin'), 1500);
      return;
    }
    const errorMessage = await user.signIn({
      email,
      password,
    });
    if (!errorMessage) {
      navigate('/');
      return;
    }
    message.error(errorMessage);
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>{title}</h1>
      <AntdForm name='login' onFinish={onFinish}>
        <AntdForm.Item
          name='email'
          rules={[
            { required: true, message: 'Пожалуйста введите Email' },
            {
              type: 'email',
              message: 'Введите корректный Email',
            },
          ]}
        >
          <Input placeholder='Email' />
        </AntdForm.Item>
        {isSignUp && (
          <>
            <AntdForm.Item
              name='name'
              rules={[{ required: true, message: 'Пожалуйста введите ФИО' }]}
            >
              <Input placeholder='ФИО' />
            </AntdForm.Item>
            <AntdForm.Item
              name='birthDate'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста укажите дату рождения',
                },
              ]}
            >
              <DatePicker className='datepicker' />
            </AntdForm.Item>
            <AntdForm.Item
              name='userName'
              rules={[
                {
                  message: 'Пожалуйста введите username',
                  required: true,
                },
                { validator: validateUserName },
              ]}
            >
              <Input placeholder='Username' />
            </AntdForm.Item>
          </>
        )}
        <AntdForm.Item
          name='password'
          rules={[
            { required: true, message: 'Пожалуйста введите пароль' },
            {
              validator: validatePassword(isSignUp),
            },
          ]}
        >
          <Input.Password placeholder='Пароль' />
        </AntdForm.Item>
        {isSignUp && (
          <AntdForm.Item
            name='repeatPassword'
            rules={[
              validateRepeatPassword,
              {
                required: true,
                message: 'Пожалуйста повторите пароль',
              },
            ]}
          >
            <Input.Password placeholder='Повторите пароль' />
          </AntdForm.Item>
        )}
        <AntdForm.Item>
          <div className='form-controls'>
            <Link to={isSignUp ? '/signin' : '/signup'}>
              {isSignUp ? 'Войти' : 'Зарегистрироваться'}
            </Link>
            <Button type='primary' htmlType='submit'>
              {isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </div>
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
};
