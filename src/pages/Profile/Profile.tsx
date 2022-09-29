import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, message } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'components';
import { User, user } from 'store';
import { getFormItem, inputs } from './constants';

import './styles.css';

export const Profile = observer(() => {
  const navigate = useNavigate();

  const {
    avatar,
    email,
    country,
    city,
    name,
    userName,
    birthDate,
    gender,
    id,
  } = user;

  const initialValues = {
    email,
    city,
    name,
    country,
    birthDate: moment(birthDate),
    gender,
    userName,
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const onFinish = async (values: {}) => {
    const updatedFields = Object.entries(values).filter(([key, value]) => {
      if (value && value !== user[key as keyof User]) {
        return !(
          key === 'birthDate' &&
          JSON.stringify(value) === JSON.stringify(moment(birthDate))
        );
      }
    });
    if (updatedFields.length) {
      const data = Object.fromEntries(updatedFields);
      const responseMessage: { type: string; message: string } =
        await user.updateUserData(data, id!);
      if (responseMessage.type === 'success') {
        message.success(responseMessage.message);
        setTimeout(() => navigate('/'), 1500);
        return;
      }
      message.error(responseMessage.message);
    }
  };

  return (
    <div className='profile-container'>
      <h1>Профиль пользователя</h1>
      <Avatar onClick={() => {}} src={avatar} size={150} />
      <Form
        className='form'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={initialValues}
        onFinish={onFinish}
      >
        {inputs.map(({ name, title, inputType, rules }) => (
          <Form.Item
            label={title}
            className='form-item'
            key={name}
            name={name}
            rules={rules}
          >
            {getFormItem(inputType)}
          </Form.Item>
        ))}
        <div className='controls'>
          <Button onClick={() => navigate(-1)}>Отмена</Button>
          <Form.Item>
            <Button htmlType='submit'>Сохранить</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
});
