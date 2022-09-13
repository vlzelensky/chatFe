import { FC } from 'react';
import { Form as AntdForm, Input, Button, DatePicker, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from 'api';
import { user } from 'store/user';
import { FormProps } from './types';
import { validatePassword, validateRepeatPassword, validateUserName } from './validators';

import './styles.css';

export const Form: FC<FormProps> = ({ title, mode }) => {
  const navigate = useNavigate();

  const isSignUp = mode === 'signup';

  const onFinish = async (values: {
    name: string;
    userName: string;
    password: string;
    repeatPassword: string;
    birthDate: string;
    email: string;
  }) => {
    if (isSignUp) {
      const isError = await registerUser(values);
      if (isError) {
        message.error('Пользователь с таким e-mail уже существует');
        return;
      }
      message.success('Вы успешно зарегистрированы');
      setTimeout(() => navigate('/signin'), 1500);
      return;
    }
    await user.signIn({ email: values.email, password: values.password });
    navigate('/');
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
              rules={[{ required: true, message: 'Пожалуйста укажите дату рождения' }]}
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
              { required: true, message: 'Пожалуйста повторите пароль' },
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
